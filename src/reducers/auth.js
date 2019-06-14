import {
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  SIGN_UP,
  UPDATE_QUESTIONS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false
      };
    case SIGN_UP:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    case UPDATE_QUESTIONS: {
      return {
        ...state,
        user: { ...state.user, questions: payload }
      };
    }
    default:
      return state;
  }
}
