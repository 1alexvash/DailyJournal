import React from "react";

import { deleteRecord } from "../../../actions/records";

import dateIcon from "../../images/date.png";

import { connect } from "react-redux";

const Record = ({ record, deleteRecord }) => (
  <div className="record">
    <div className="date">
      <img src={dateIcon} alt="date" /> {record.date}
    </div>
    <div className="questions-list">
      {record.listOfQuestions.map((listItem, index) => (
        <section key={index}>
          <h1 className="question">{listItem.question}</h1>
          <h2 className="answer">{listItem.answer}</h2>
        </section>
      ))}
    </div>
    <button className="remove-record" onClick={() => deleteRecord(record)}>
      REMOVE RECORD
    </button>
  </div>
);

export default connect(
  null,
  { deleteRecord }
)(Record);
