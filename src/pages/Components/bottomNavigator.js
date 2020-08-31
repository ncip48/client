import React, {useEffect} from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {CameraAlt, Home, Apps, Email, AccountCircle} from '@material-ui/icons';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {AppBar, Toolbar} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    top:'auto',
    bottom:0,
    position:'fixed'
  },
  appBar: {
  },
  bot: {
      minWidth:0,
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function LabelBottomNavigation() {
    const location = useLocation();
    const classes = useStyles();
    const [value, setValue] = React.useState("home");

    useEffect(() => {
        // Update the document title using the browser API
        //document.title = `You clicked ${count} times`;
        if(location.pathname == ''){setValue("home")}else if(location.pathname == '/profile' || location.pathname.split("/")[1] === 'u'){setValue('profile')}else{setValue('')}
      });

    const handleChange = (event, newValue) => {
        //setValue(newValue);
        //console.log(location.pathname);
    };



  return (
      location.pathname === '/notif' || location.pathname === 'notif' ? null :
    <div className={classes.sectionMobile}>
    <BottomNavigation position="fixed" color="primary" value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Post" value="post" icon={<CameraAlt />}  className={classes.bot}/>
      <BottomNavigationAction label="Product" value="product" icon={<Apps />}  className={classes.bot}/>
      <BottomNavigationAction label="Home" value="" icon={<Home />} component={Link} to="/" className={classes.bot}/>
      <BottomNavigationAction label="Chat" value="chat" icon={<Email />}   className={classes.bot}/>
      <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircle />} component={Link} to="/profile" className={classes.bot}/>
    </BottomNavigation>
    </div>
  );
  //component={Link} to="/chat"
}
