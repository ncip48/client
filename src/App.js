/*import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res.message }));
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-intro">{this.state.apiResponse}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
*/

import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import AuthRoute from './routes/AuthRoute';
import HomeRoute from './routes/HomeRoute';
import Home from "./pages/HomePage/Home";
import Notif from "./pages/HomePage/Notif";
import Profile from "./pages/HomePage/Profile";
import ProfileUser from "./pages/HomePage/ProfileUser";
import Login from "./pages/AuthPage/Login";
import Register from "./pages/AuthPage/Register";
import { AuthContext } from "./context/auth";

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("authenticated"));
  //const existingTokens = (localStorage.getItem("authenticated"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const existingUsername = localStorage.getItem("username");
  const [authUsername, setAuthUsername] = useState(existingUsername);
  
  const setTokens = (data) => {
    localStorage.setItem("authenticated", JSON.stringify(data));
    //localStorage.setItem("authenticated", (data));
    setAuthTokens(data);
  }

  const setUsername = (data) => {
    localStorage.setItem("username", JSON.stringify(data));
    setAuthUsername(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, authUsername, setAuthUsername: setUsername }}>
      <Router>
          <AuthRoute exact path="/" component={Home} />
          <HomeRoute path="/login" component={Login} />
          <HomeRoute path="/daftar" component={Register} />
          <AuthRoute path="/home" component={Home} />
          <AuthRoute path="/notif" component={Notif} />
          <AuthRoute path="/profile" component={Profile} />
          <Route path="/u/:username" component={ProfileUser} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

/* import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import LoginComponent from "./pages/AuthPage/Login";
import SignUpComponent from "./pages/AuthPage/Register";
import Home from "./pages/HomePage/Home";
import { autoLogin } from "./actions/userActions";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import AuthRoute from "./routes";

const App = () => {
  const userReducer = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <div>
      <Router>
        
          <Route path="/login" component={LoginComponent} />
          <Route path="/daftar" component={SignUpComponent} />
          <Route path="/" component={Home} />
        
      </Router>
    </div>
  );
};

export default App; */


/*import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";

import reducer from "./reducers";
import { createStore } from "redux";

import NavBar from "./pages/AuthPage/BaseLayout";
import { Typography, Divider } from "@material-ui/core";

import AuthRoute from "./components/AuthRoute";

import HomePage from "./pages/HomePage/Home";
import LoginPage from "./pages/AuthPage/Login";

import { appMiddleware } from "./middlewares/app";
import { apiMiddleware } from "./middlewares/core";
import MyAccount from "./pages/MyAccount";

const createStoreWithMiddleware = applyMiddleware(
  appMiddleware,
  apiMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

const IndexPage = () => (
  <>
    <Typography variant="h3">Welcome to the App</Typography>
    <Divider style={{ marginTop: 10, marginBottom: 10 }} />
    <Typography variant="h6">Feel free to take a look around</Typography>
  </>
);

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <AuthRoute path="/home" render={HomePage} type="private" />
            <AuthRoute path="/login" type="guest">
              <LoginPage />
            </AuthRoute>
            <AuthRoute path="/my-account" type="private">
              <MyAccount />
            </AuthRoute>
            <Route path="/" render={IndexPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
} */