import config from "./config";
import app from "firebase/app";
import "firebase/database";
import "firebase/auth";

const api = app.initializeApp(config);

const auth = api.auth();
const db = api.database();

const createUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

const loginUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const resetPassword = email => auth.sendPasswordResetEmail(email);

const logOut = () => auth.signOut();

const firebase = {
  auth,
  db,
  createUser,
  loginUser,
  resetPassword,
  logOut
};

export { firebase };
