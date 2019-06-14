import {
  CHECK_IF_JOURNAL_IS_FILLED,
  GET_RECORDS,
  ADD_RECORD,
  REMOVE_RECORD
} from "../actions/types";

const initialState = {
  records: [],
  isJournalFilledForToday: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHECK_IF_JOURNAL_IS_FILLED:
      return {
        ...state,
        isJournalFilledForToday: payload
      };
    case GET_RECORDS:
      return {
        ...state,
        records: payload
      };
    case ADD_RECORD:
      return {
        ...state,
        isJournalFilledForToday: true,
        records: [payload, ...state.records]
      };
    case REMOVE_RECORD:
      return {
        ...state,
        records: state.records.filter(record => record._id !== payload._id)
      };
    default:
      return state;
  }
}
