import React, { Fragment, useEffect } from "react";

import {
  checkIfJournalIsFilled,
  getRecords,
  addRecord
} from "../../actions/records";

import { Link } from "react-router-dom";

import Navbar from "../layout/Navbar";

import { connect } from "react-redux";

const UserPage = ({
  auth,
  records,
  checkIfJournalIsFilled,
  getRecords,
  addRecord
}) => {
  useEffect(() => {
    checkIfJournalIsFilled();
  }, [checkIfJournalIsFilled]);

  function fillJournal(e) {
    e.preventDefault();

    let journallFilled = true;
    auth.user.questions.forEach((question, index) => {
      if (e.target[`field${index}`].value === "") {
        journallFilled = false;
      }
    });

    if (journallFilled) {
      const newRecord = auth.user.questions.map(question => ({
        question,
        answer: e.target[question].value
      }));

      addRecord(newRecord);
    }
  }

  if (auth.loading) {
    return "";
  }

  return (
    <Fragment>
      <Navbar />
      <div className="User-page">
        {records.isJournalFilledForToday ? (
          <div className="journal-is-already-filled">
            <p>YOUR JOURNAL </p>
            <p> IS ALREADY</p>
            <p> FILLED FOR TODAY </p>
            <p> COME BACK</p>
            <p> TOMORROW</p>
            <Link to={"/history"}>Check your history</Link>
          </div>
        ) : (
          <div className="fill-in-journal">
            <h1>Fill in journal for today:</h1>
            <form
              onSubmit={e => fillJournal(e)}
              className="answer-daily-questions"
            >
              {auth.user.questions.map((question, index) => (
                <section key={index}>
                  <label htmlFor={question}>
                    #{index + 1} {question}
                  </label>
                  <textarea name={`field${index}`} id={question} rows="5" />
                </section>
              ))}
              <input type="submit" value="Fill In Journal For Today" />
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  records: state.records
});

export default connect(
  mapStateToProps,
  { checkIfJournalIsFilled, getRecords, addRecord }
)(UserPage);
