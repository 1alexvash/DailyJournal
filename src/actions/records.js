import {
  CHECK_IF_JOURNAL_IS_FILLED,
  GET_RECORDS,
  ADD_RECORD,
  REMOVE_RECORD
} from "../actions/types";
import axios from "axios";

// CHECK_IF_JOURNAL_IS_FILLED
export const checkIfJournalIsFilled = () => async dispatch => {
  try {
    const res = await axios.get("/api/records/check-if-fillled");
    dispatch({
      type: CHECK_IF_JOURNAL_IS_FILLED,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// GET_RECORDS
export const getRecords = () => async dispatch => {
  try {
    const res = await axios.get("/api/records");
    dispatch({
      type: GET_RECORDS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// ADD_RECORD
export const addRecord = record => async dispatch => {
  try {
    const res = await axios.post("/api/records", record);
    dispatch({ type: ADD_RECORD, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// DELETE_RECORD
export const deleteRecord = record => async dispatch => {
  try {
    const res = await axios.delete(`/api/records/${record._id}`);
    dispatch({ type: REMOVE_RECORD, payload: res.data });

    // rechecking if today's post was deleted
    const nextRes = await axios.get("/api/records/check-if-fillled");
    dispatch({
      type: CHECK_IF_JOURNAL_IS_FILLED,
      payload: nextRes.data
    });
  } catch (err) {
    console.log(err);
  }
};
