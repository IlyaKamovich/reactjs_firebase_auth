import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { FirebaseAuthContext } from "./context";
import { Preloader } from "./components";
import { PrivateRoute } from "./units";
import { Login, Home, Signup, Reset } from "./pages";

import "./styles/index.scss";

const App = () => {
  const { loading, user } = useContext(FirebaseAuthContext);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Switch>
      <PrivateRoute exact user={user} path="/" component={Home} />
      <Route
        exact
        path="/login"
        render={() => (user ? <Redirect to="/" /> : <Login />)}
      />
      <Route
        exact
        path="/signup"
        render={() => (user ? <Redirect to="/" /> : <Signup />)}
      />
      <Route
        exact
        path="/reset"
        render={() => (user ? <Redirect to="/" /> : <Reset />)}
      />
      <Route render={() => <div>Page not found.</div>} />
    </Switch>
  );
};

export default App;
