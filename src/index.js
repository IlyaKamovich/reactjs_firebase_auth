import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { FirebaseAuthProvider } from "./provider";
import App from "./App";

const Root = () => {
  return (
    <FirebaseAuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseAuthProvider>
  );
};

const rootElement = document.getElementById("root-app");
ReactDOM.render(<Root />, rootElement);
