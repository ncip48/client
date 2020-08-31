import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Button } from "../../components/AuthForm";
import { useAuth } from "../../context/auth";
import Header from "../Components/header";
import BottomNavigator from "../Components/bottomNavigator";

function Home(props) {
  const { setAuthTokens } = useAuth();
  //const [isLoggedIn, setLoggedIn] = useState(true);

  function logOut() {
    setAuthTokens(false);
    //localStorage.removeItem("tokens");
    //localStorage.clear();
    //setLoggedIn(false);
    //return <Redirect to="/login" />;
    //console.log(localStorage.getItem("tokens"));
  }

  return (
    <div>
      <Header />
        <div style={{marginTop:75}}>Notif Page</div>
        <BottomNavigator />
    </div>
  );
}

export default Home;
