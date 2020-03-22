import React, { useState, useEffect } from "react";
import { FirebaseAuthContext } from "../context";
import { withFirebase } from "../hoc";

const FirebaseAuthProvider = ({ firebase, children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    manageCurrentUser();
  }, []);

  const manageCurrentUser = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  };

  return (
    <FirebaseAuthContext.Provider value={{ loading, user }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const FirebaseAuthProviderComponent = withFirebase(FirebaseAuthProvider);

export { FirebaseAuthProviderComponent as FirebaseAuthProvider };
