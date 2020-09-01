import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import { useAuth } from "../../context/auth";
import {
  CardMedia,
  Container,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Card,
  Grid,
} from "@material-ui/core";
import { MoreVert, Favorite, Share } from "@material-ui/icons";
import { red, grey } from "@material-ui/core/colors";
//import { Slide } from "material-auto-rotating-carousel";
//import { AutoRotatingCarousel } from "material-auto-rotating-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import Header from "../Components/header";
import BottomNavigator from "../Components/bottomNavigator";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 56,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      marginTop: 64,
    },
  },
  media_carousel: {
    height: 140,
    [theme.breakpoints.up("sm")]: {
      height: 200,
      marginTop: 15,
    },
  },
  container: {
    //padding: 0,
    paddingBottom: 56,
    [theme.breakpoints.up("sm")]: {},
  },
  indicator: {
    marginTop: -20,
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  showDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  mediaPost: {
    height: 280,
  },
  judul: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    color: grey[900],
    textDecoration: "none",
  },
  nounderline: {
    textDecoration: "none",
    color: grey[900],
  },
}));

function Home(props) {
  const classes = useStyles();
  //const { setAuthTokens } = useAuth();
  const existingUsername = localStorage.getItem("username");
  const [authUsername] = useState(JSON.parse(existingUsername)[0]);
  const [post, setPost] = useState({ data: [] });
  const [setIsError] = useState(false);

  function getPost() {
    axios
      .get("https://api-client1-mp-ncip.herokuapp.com/homepage/" + authUsername.username)
      .then((result) => {
        console.log(result.data);
        if (result.status === 200) {
          setPost(result.data);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.root}>
        <Container flexWrap="wrap" maxWidth="md" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <div style={{ width: "100%" }}>
                <Carousel
                  animation="slide"
                  style={{ padding: 0 }}
                  //indicatorProps={classes.indicator}
                  //activeIndicatorProps
                >
                  <CardMedia
                    className={classes.media_carousel}
                    image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                  />
                  <CardMedia
                    className={classes.media_carousel}
                    image="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png"
                  />
                  <CardMedia
                    className={classes.media_carousel}
                    image="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png"
                  />
                  <CardMedia
                    className={classes.media_carousel}
                    image="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png"
                  />
                </Carousel>
              </div>
              <Grid container spacing={3}>
                {post.data.map((posts) => (
                  <Grid item xs={12} sm={6}>
                    <Card>
                      <CardHeader
                        avatar={
                          posts.foto !== "" ? (
                            <Avatar
                              src={
                                "/asset/img/user/" +
                                posts.id_konsumen +
                                "/" +
                                posts.foto
                              }
                              className={classes.photo}
                              component={Link}
                              to={"/u/" + posts.username}
                            />
                          ) : (
                            <Avatar
                              className={classes.avatar}
                              component={Link}
                              to={"/u/" + posts.username}
                            >
                              HC
                            </Avatar>
                          )
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVert />
                          </IconButton>
                        }
                        title={posts.nama_lengkap}
                        subheader="September 14, 2016"
                      />
                      <CardMedia
                        className={classes.mediaPost}
                        image={
                          "/asset/img/post/" +
                          posts.id_konsumen +
                          "/" +
                          posts.img
                        }
                      />
                      <CardContent>
                        <Typography
                          className={classes.judul}
                          variant="h5"
                          component={Link}
                          to={"/p/" + posts.id_post}
                        >
                          {posts.judul_post}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <Favorite />
                        </IconButton>
                        <IconButton aria-label="share">
                          <Share />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.showDesktop}>
              ASU
            </Grid>
          </Grid>
        </Container>
      </div>
      <BottomNavigator />
    </div>
  );
}

export default Home;
