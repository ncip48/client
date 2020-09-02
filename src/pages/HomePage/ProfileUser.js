import React, { useState, useEffect } from "react";
//import { Link, Redirect, withRouter } from "react-router-dom";
//import { Button } from "../../components/AuthForm";
//import { useAuth } from "../../context/auth";
import { makeStyles } from "@material-ui/core/styles";
//import List from "@material-ui/core/List";
//import ListItem from "@material-ui/core/ListItem";
//import ListItemIcon from "@material-ui/core/ListItemIcon";
//import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
//import InboxIcon from "@material-ui/icons/Inbox";
//import DraftsIcon from "@material-ui/icons/Drafts";
import Header from "../Components/header";
import BottomNavigator from "../Components/bottomNavigator";
import {
  Container,
  Box,
  Avatar,
  Typography,
  CardMedia,
  Card,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import axios from "axios";
//import { MoreVert, Favorite, Share, Person } from "@material-ui/icons";
//const qs = require("querystring");

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 56,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      marginTop: 64,
    },
  },
  photo: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(12),
    height: theme.spacing(12),
    fontSize: 30,
  },
  media: {
    height: 140,
    [theme.breakpoints.up("sm")]: {
      height: 280,
    },
  },
  container: {
    marginTop: -45,
  },
  name: {
    marginTop: 10,
  },
  mediaPost: {
    height: 280,
  },
}));

function ProfileUser(props) {
  const classes = useStyles();
  //const { setAuthTokens } = useAuth();
  //const [isLoggedIn, setLoggedIn] = useState(true);
  //const existingUsername = localStorage.getItem("username");
  //const [authUsername] = useState(JSON.parse(existingUsername)[0]);
  const [setIsError] = useState(false);
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const [post, setPost] = useState({ post: [] });
  const {
    match: { params },
  } = props;
  const [loading, setLoading] = useState(true);

  //function getDetail() {}

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    axios
      .get(
        "https://api-client1-mp-ncip.herokuapp.com/getdetail/" +
          params.username,
        { signal: signal }
      )
      .then((result) => {
        //console.log(result.data.data.post);
        if (result.status === 200) {
          setData(result.data.data);
          setUser(result.data.data.user);
          setPost(result.data.data);
          setLoading(false);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
    document.title = "@" + params.username + " - IDNStyle.com";
    return () => abortController.abort();
  }, [params.username, setIsError]);

  return (
    <div>
      <Header />
      <div className={classes.root}>
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <Container maxWidth="md" className={classes.container}>
          <Box alignItems="center">
            <Box
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              display="flex"
            >
              <Box flexDirection="row" textAlign="center">
                {user.foto !== "" ? (
                  <Avatar
                    src={
                      "/asset/img/user/" + user.id_konsumen + "/" + user.foto
                    }
                    className={classes.photo}
                  />
                ) : (
                  <Avatar className={classes.photo}>
                    {user.nama_lengkap.split(" ").length <= 1
                      ? user.nama_lengkap.split("")[0]
                      : user.nama_lengkap.split(" ")[0].split("")[0] +
                      user.nama_lengkap.split(" ")[1].split("")[0]}
                  </Avatar>
                )}
                <Typography variant="h6" className={classes.name}>
                  {loading ? <CircularProgress size={20} /> : user.nama_lengkap}
                </Typography>
              </Box>
            </Box>
            <Grid
              container
              spacing={2}
              style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}
            >
              <Grid item xs={4} md={4}>
                <Typography variant="subtitle1" className={classes.title}>
                  Post
                </Typography>
                <Typography variant="subtitle2" className={classes.title}>
                  {loading ? <CircularProgress size={20} /> : data.jumlah_post}
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="subtitle1" className={classes.title}>
                  Follower
                </Typography>
                <Typography variant="subtitle2" className={classes.title}>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    data.jumlah_followers
                  )}
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="subtitle1" className={classes.title}>
                  Following
                </Typography>
                <Typography variant="subtitle2" className={classes.title}>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    data.jumlah_following
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              spacing={3}
              style={{ marginTop: 10, justifyContent: "center" }}
            >
              {loading ? (
                <CircularProgress size={20} style={{}} />
              ) : (
                post.post.map((posts, key) => (
                  <Grid item xs={12} sm={4} key={key}>
                    <Card>
                      <CardMedia
                        className={classes.mediaPost}
                        image={
                          "/asset/img/post/" +
                          posts.id_konsumen +
                          "/" +
                          posts.img
                        }
                      />
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Container>
      </div>
      <BottomNavigator />
    </div>
  );
}

export default ProfileUser;
