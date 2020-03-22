import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";
import { withFirebase } from "../hoc";

class Reset extends PureComponent {
  state = {
    email: "",
    error: false,
    errorMessage: "",
    loading: false
  };

  handleSubmitEmailToResetPassword = event => {
    event.preventDefault();
    this.setState(
      {
        loading: true,
        error: false,
        errorMessage: ""
      },
      () =>
        this.props.firebase
          .resetPassword(this.state.email)
          .then(() =>
            Swal.fire({
              icon: "success",
              title: "Check your email",
              text: "Now you can go back to login page."
            }).then(() => this.props.history.push("/login"))
          )
          .catch(({ message }) => {
            this.setState({
              loading: false,
              error: true,
              errorMessage: message
            });
          })
    );
  };

  handleChangeText = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="reset__container">
        <form onSubmit={this.handleSubmitEmailToResetPassword}>
          <Typography
            align="center"
            component="h1"
            variant="h3"
            color="primary"
          >
            Reset password
          </Typography>
          <FormControl color="primary" margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              autoFocus
              value={this.state.email}
              id="email"
              name="email"
              aria-describedby="email-helper-text"
              onChange={this.handleChangeText}
            />
            <FormHelperText id="email-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <Link className="reset__link" to="/login">
            Back to login
          </Link>
          <div className="signup__loading__box">
            {this.state.loading ? (
              <CircularProgress color="primary" />
            ) : (
              <Button
                className="reset__button"
                disabled={this.state.email.length < 6}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                RESET
              </Button>
            )}
          </div>
        </form>
        {this.state.error && (
          <Alert className="reset__error__box" severity="error">
            <AlertTitle>Error</AlertTitle>
            {this.state.errorMessage}
          </Alert>
        )}
      </div>
    );
  }
}

const ResetPassword = withRouter(withFirebase(Reset));

export { ResetPassword as Reset };
