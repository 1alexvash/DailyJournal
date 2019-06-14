import React, { Fragment } from "react";
import { updateQuestions, deleteAccount } from "../../actions/auth";

import Navbar from "../layout/Navbar";
import { connect } from "react-redux";

const Settings = ({ auth, updateQuestions, deleteAccount }) => {
  function deleteQuestion(index) {
    const updatedQuestions = auth.user.questions.filter(
      question => auth.user.questions.indexOf(question) !== index
    );
    if (updatedQuestions.length > 0) {
      updateQuestions(updatedQuestions);
    } else {
      alert("You need to have at least one question");
    }
  }

  function addQuestion(e) {
    e.preventDefault();
    const question = e.target.newQuestion.value;
    if (question !== "") {
      e.target.newQuestion.value = "";
      updateQuestions(auth.user.questions.concat(question));
    }
  }

  if (auth.loading) {
    return "";
  }

  return (
    <Fragment>
      <Navbar />
      <div className="Settings">
        <ul className="list-of-questions">
          {auth.user.questions.map((question, index) => (
            <li key={question}>
              <span>
                #{index + 1} {question}
              </span>
              <button
                className="delete-question"
                onClick={() => deleteQuestion(index)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={e => addQuestion(e)} className="add-question">
          <label htmlFor="new-question">What is your new daily question?</label>
          <input type="text" name="newQuestion" id="new question" />
          <input type="submit" value="Add a Question" />
        </form>
        <div className="delete-account-form">
          <p className="dangerous-area">DANGEROUS AREA:</p>
          <button className="delete-account" onClick={() => deleteAccount()}>
            Delete Account
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateQuestions, deleteAccount }
)(Settings);
