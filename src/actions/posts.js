import axios from "axios";
import { GET_POSTS, ADD_POST, REMOVE_POST } from "./types";

// GET_POSTS
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// ADD_POST
export const addPost = post => async dispatch => {
  try {
    const res = await axios.post("/api/posts", { post });
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

// REMOVE_POST
export const removePost = postId => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    console.log(res);
    dispatch({
      type: REMOVE_POST,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};
