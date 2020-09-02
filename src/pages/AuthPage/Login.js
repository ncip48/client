import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  OutlinedInput,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  Button,
  Container,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../context/auth";
//import BaseLayout from "../AuthPage/BaseLayout";
import Header from "../Components/header";
const qs = require("querystring");

const useStyles = makeStyles((theme) => ({
  root: {
    //marginTop: 56,
    width: "100%",
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      //marginTop: 64,
    },
  },
  textField: {
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
}));

function Login() {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const { setAuthTokens } = useAuth();
  //const { setAuthUsername } = useAuth();

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const requestBody = {
    username: userName,
    password: password,
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  function postLogin() {
    setIsError(false);
    setLoading(true);
    axios
      .post(
        "https://api-client1-mp-ncip.herokuapp.com/login",
        qs.stringify(requestBody),
        config
      )
      .then((result) => {
        //console.log(result.data.data[0].username)
        setLoading(false);
        if (result.data.result === 1) {
          //setAuthTokens(result.data.data.username);
          //setAuthTokens(true)
          setAuthTokens(result.data.data);
          //setAuthUsername(true)
          setLoggedIn(true);
        } else {
          setIsError(true);
          setErrorMessage(result.data.error);
        }
      })
      .catch((e) => {
        setIsError(true);
        setErrorMessage("Connection Error!");
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  console.log(password);

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Container maxWidth="md" className={classes.container}>
          <Box
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="text"
                //value={values.password}
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                //onChange={handleChange("password")}
                labelWidth={70}
              />
            </FormControl>
            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                //value={values.password}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                //onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button variant="contained" color="primary" onClick={postLogin} disabled={loading} style={{marginTop:5}}>
              {loading && <CircularProgress size={20} />}
              {!loading && "Login"}
            </Button>
            {isError && (
              <Alert
                variant="filled"
                severity="error"
                style={{ marginTop: 10 }}
              >
                {errorMessage}
              </Alert>
            )}
          </Box>
        </Container>
      </div>
    </>
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
