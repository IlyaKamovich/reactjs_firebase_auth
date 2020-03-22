import React from "react";
import { firebase } from "../firebase";

const withFirebase = Component => props => {
  return <Component {...props} firebase={firebase} />;
};

export { withFirebase };
