import axios from "axios";
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGN_UP,
  UPDATE_QUESTIONS
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      console.error(err);
    }
  }
};

// Register User
export const register = user => async dispatch => {
  try {
    const res = await axios.post("/api/users", user);

    dispatch({
      type: SIGN_UP,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    alert(errors[0].msg);
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const user = { email, password };
  try {
    const res = await axios.post("/api/auth", user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    alert(errors[0].msg);
  }
};

// Update list of user's daily questions
export const updateQuestions = newQuestions => async dispatch => {
  try {
    const res = await axios.post("/api/users/update-questions", newQuestions);
    dispatch({ type: UPDATE_QUESTIONS, payload: res.data.questions });
  } catch (err) {
    const errors = err.response.data.errors;
    alert(errors[0].msg);
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

// Delete account
export const deleteAccount = () => async dispatch => {
  if (
    window.confirm(
      `Are you sure that you want to delete your account?
      There is no way back!`
    )
  ) {
    try {
      await axios.delete("/api/users/delete-account");
      dispatch({ type: LOGOUT });
    } catch (err) {
      const errors = err.response.data.errors;
      alert(errors[0].msg);
    }
  }
};
