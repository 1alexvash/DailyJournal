import React, { Fragment, useEffect } from "react";

import { getRecords } from "../../actions/records";

import Record from "./Record/Record";

import Navbar from "../../components/layout/Navbar";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

const History = ({ records, getRecords }) => {
  useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <Fragment>
      <Navbar />
      <div className="History">
        <h1 className="heading">History:</h1>

        {records.records.length === 0 ? (
          <Link to={"/user-page"} className="history-is-empty">
            Your history is empty go and write something
          </Link>
        ) : (
          <Fragment>
            {records.records.map(record => (
              <Record key={record.date} record={record} />
            ))}
          </Fragment>
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
  { getRecords }
)(History);
