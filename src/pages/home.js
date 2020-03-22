import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withFirebase } from "../hoc";
import { isEmpty } from "../helpers";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  userInfo: {
    padding: "1em 0 0 1em"
  }
}));

const Home = ({ firebase }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));
    if (isEmpty(userInfo)) {
      getUserInfo();
    } else {
      setUserInfo(userInfo);
      setLoading(false);
    }
  }, []);

  const getUserInfo = () => {
    firebase.db
      .ref(`users/${firebase.auth.currentUser.uid}`)
      .once("value", snapshot => {
        setUserInfo(snapshot.val());
        setLoading(false);
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(snapshot.val()));
      });
  };

  const onClickLogOut = () => {
    firebase.logOut().then(() => localStorage.removeItem(USER_INFO_KEY));
  };

  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Icon className={classes.menuButton}>home</Icon>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
          <Button onClick={onClickLogOut} color="inherit">
            LOG OUT
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.userInfo}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Typography component="p" variant="h6" color="secondary">
            Username - {userInfo.userName}
            <br />
            Email - {userInfo.email}
            <br />
            Uid - {userInfo.userId}
            <br />
            Created at - {userInfo.createdAt}
          </Typography>
        )}
      </Container>
    </div>
  );
};

const HomePage = withFirebase(Home);

export { HomePage as Home };
