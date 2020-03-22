import React, { PureComponent } from "react";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import moment from "moment";
import { withFirebase } from "../hoc";
import { FirstStep, SecondStep } from "../components";

class Signup extends PureComponent {
  state = {
    activeStep: 1,
    loading: false,
    userName: "",
    email: "",
    password: "",
    error: false,
    errorMessage: "",
    steps: ["Enter your username.", "Enter email and password"],
    createdAt: moment().format("LL")
  };

  nextStep = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  prevStep = () => {
    this.setState({
      error: false,
      errorMessage: "",
      activeStep: this.state.activeStep - 1
    });
  };

  handleChangeText = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  createUserName = () => {
    this.setState(
      {
        loading: true,
        error: false,
        errorMessage: ""
      },
      () =>
        this.checkUniqueUserNameValue()
          .then(() => {
            this.setState(
              {
                loading: false
              },
              () => this.nextStep()
            );
          })
          .catch(message => {
            this.setState({
              loading: false,
              error: true,
              errorMessage: message
            });
          })
    );
  };

  checkUniqueUserNameValue = () => {
    return new Promise((res, rej) => {
      this.props.firebase.db
        .ref("users")
        .orderByChild("userName")
        .equalTo(this.state.userName)
        .once("value", user => {
          if (user.val()) {
            rej("Sorry, that username already exists.");
          } else {
            res();
          }
        });
    });
  };

  register = () => {
    this.setState(
      {
        loading: true,
        error: false,
        errorMessage: ""
      },
      () =>
        this.props.firebase
          .createUser(this.state.email, this.state.password)
          .then(user => {
            this.writeUserData(user.user.uid);
          })
          .catch(({ message }) => {
            this.setState({
              loading: false,
              error: true,
              errorMessage: message
            });
          })
    );
  };

  writeUserData = userId => {
    this.props.firebase.db.ref(`users/${userId}`).set({
      userName: this.state.userName,
      email: this.state.email,
      userId: userId,
      createdAt: this.state.createdAt
    });
  };

  renderActiveStepComponent = () => {
    const {
      loading,
      error,
      errorMessage,
      userName,
      email,
      password,
      activeStep
    } = this.state;
    let activeComponent;
    switch (activeStep) {
      case 1:
        return (activeComponent = (
          <FirstStep
            userName={userName}
            handleChangeText={this.handleChangeText}
            createUserName={this.createUserName}
            loading={loading}
            error={error}
            errorMessage={errorMessage}
          />
        ));
      case 2:
        return (activeComponent = (
          <SecondStep
            email={email}
            password={password}
            handleChangeText={this.handleChangeText}
            register={this.register}
            loading={loading}
            error={error}
            errorMessage={errorMessage}
            prevStep={this.prevStep}
          />
        ));
    }
    return activeComponent;
  };

  render() {
    return (
      <div className="signup__container">
        <Typography align="center" component="h1" variant="h3" color="primary">
          Sign up.
        </Typography>
        {this.renderActiveStepComponent()}
        <Stepper
          className="stepper"
          activeStep={this.state.activeStep - 1}
          alternativeLabel
        >
          {this.state.steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

const SignupPage = withFirebase(Signup);

export { SignupPage as Signup };
