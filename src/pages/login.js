import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withFirebase } from "../hoc";

const Login = ({ firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorLoging, setErrorLoging] = useState(false);
  const [errorLogingText, setErrorLogingText] = useState("");

  const loginSubmit = event => {
    event.preventDefault();

    setLoading(true);
    setErrorLoging(false);
    setErrorLogingText("");

    firebase.loginUser(email, password).catch(error => {
      setLoading(false);
      setErrorLoging(true);
      setErrorLogingText(error.message);
    });
  };

  return (
    <div className="login__container">
      <form onSubmit={loginSubmit}>
        <Typography
          className="login__title"
          component="h1"
          variant="h2"
          color="primary"
        >
          Login now
        </Typography>
        <FormControl color="primary" margin="normal" fullWidth>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoFocus
            id="email"
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl color="primary" margin="normal" fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            id="password"
            aria-describedby="password-helper-text"
          />
          <FormHelperText id="password-helper-text">
            We'll never share your password.
          </FormHelperText>
        </FormControl>
        <Link className="login__link" to="/reset">
          Forgot password?
        </Link>
        <div className="login__progress">
          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button
              disabled={password.trim().length < 6}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              LOGIN
            </Button>
          )}
        </div>
        <Button color="secondary" fullWidth>
          <Link className="login__link" to="/signup">
            Dont have an account? Create here...
          </Link>
        </Button>
        <br />
        {errorLoging && (
          <div className="login__error">
            <Typography
              className="error_text"
              display="block"
              component="span"
              variant="h6"
              color="secondary"
            >
              {errorLogingText}
            </Typography>
          </div>
        )}
      </form>
    </div>
  );
};

const LoginPage = withFirebase(Login);

export { LoginPage as Login };
