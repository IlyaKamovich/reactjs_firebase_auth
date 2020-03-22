import React from "react";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";

const FirstStep = ({
  userName,
  handleChangeText,
  createUserName,
  loading,
  error,
  errorMessage
}) => {
  const userNameSubmit = event => {
    event.preventDefault();
    createUserName();
  };

  return (
    <form onSubmit={userNameSubmit} className="first__step_container">
      <FormControl color="primary" margin="normal" fullWidth>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          autoFocus
          value={userName}
          id="username"
          name="userName"
          aria-describedby="username-helper-text"
          onChange={event => handleChangeText(event)}
        />
        <FormHelperText id="username-helper-text">
          We'll never share your username.
        </FormHelperText>
      </FormControl>
      <Link className="signup__link" to="/login">
        Back to login
      </Link>
      <div className="signup__loading__box">
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button
            type="submit"
            className="next__button"
            disabled={userName.length < 4}
            variant="contained"
            color="primary"
            fullWidth
          >
            NEXT
          </Button>
        )}
      </div>
      {error && (
        <Alert className="error__message" severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
    </form>
  );
};

export { FirstStep };
