import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";

const SecondStep = ({
  prevStep,
  email,
  password,
  handleChangeText,
  register,
  loading,
  error,
  errorMessage
}) => {
  const registerSubmit = event => {
    event.preventDefault();
    register();
  };

  return (
    <form onSubmit={registerSubmit} className="second__step_container">
      <FormControl color="primary" margin="normal" fullWidth>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          autoFocus
          value={email}
          id="email"
          name="email"
          aria-describedby="email-helper-text"
          onChange={event => handleChangeText(event)}
        />
        <FormHelperText id="email-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl color="primary" margin="normal" fullWidth>
        <InputLabel htmlFor="username">Password</InputLabel>
        <Input
          type="password"
          value={password}
          id="password"
          name="password"
          aria-describedby="password-helper-text"
          onChange={event => handleChangeText(event)}
        />
        <FormHelperText id="password-helper-text">
          We'll never share your password.
        </FormHelperText>
      </FormControl>
      <div className="signup__loading__box">
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button
            className="next__button"
            disabled={password.length < 6}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            SIGNUP
          </Button>
        )}
        <Button
          className="prev__button"
          onClick={prevStep}
          color="secondary"
          fullWidth
        >
          <p className="text">Back to username</p>
        </Button>
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

export { SecondStep };
