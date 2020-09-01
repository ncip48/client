import React from "react";
//import { Link, Redirect, withRouter } from "react-router-dom";
//import { Button } from "../../components/AuthForm";
//import { useAuth } from "../../context/auth";
import Header from "../Components/header";
import BottomNavigator from "../Components/bottomNavigator";

function Notif(props) {
  //const { setAuthTokens } = useAuth();
  //const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <div>
      <Header />
        <div style={{marginTop:75}}>Notif Page</div>
        <BottomNavigator />
    </div>
  );
}

export default Notif;
