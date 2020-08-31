import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Logo,
  Form,
  Input,
  Button,
  Error,
  Center,
} from "../../components/AuthForm";
import { useAuth } from "../../context/auth";
import BaseLayout from "../AuthPage/BaseLayout";
const qs = require('querystring');

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens, setAuthUsername } = useAuth();

  const requestBody = {
    username: userName,
    password: password
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  function postLogin() {
    axios
      .post("http://192.168.1.108:9000/login", qs.stringify(requestBody), config)
      .then((result) => {
          console.log(result.data.data)
        if (result.status === 200) {
          //setAuthTokens(result.data.data.username);
          //setAuthTokens(true)
          setAuthTokens(true)
          setAuthUsername(result.data.data)
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <BaseLayout>
      <div className="container container-login">
        <Center>
          <Card>
            <Form>
              <Input
                type="username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="email"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
              />
              <Button onClick={postLogin}>Sign In</Button>
            </Form>
            <Link to="/daftar">Don't have an account?</Link>
            {isError && (
              <Error>The username or password provided were incorrect!</Error>
            )}
          </Card>
        </Center>
      </div>
    </BaseLayout>
  );
}

export default Login;
/*import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../../actions/userActions'

class LoginComponent extends React.Component {
    state = {
        username: "",
        password: ""
    }

    handleOnChange = (e) => {
        e.persist();
        this.setState(() => ({
            [e.target.name]: e.target.value 
        }))
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.fetchUser(this.state)
    }

    render(){
        return(
            <div>
                <h1>Login Form</h1>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={this.state.username}
                        onChange={this.handleOnChange}
                    />
                    <br/>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleOnChange}
                    />
                    <br/>
                    <input
                        type="submit"
                        value="Login"
                    />
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (userInfo) => dispatch(fetchUser(userInfo))
    }
}

export default connect(null, mapDispatchToProps)(LoginComponent)*/
