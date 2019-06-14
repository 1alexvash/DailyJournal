import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import successIcon from "../images/success.png";

const HomePage = ({ auth }) => {
  if (!auth.loading && auth.isAuthenticated) {
    return <Redirect to={"/user-page"} />;
  }
  return (
    <div className="Homepage">
      <h1>Daily Journal</h1>
      <h2>Reasons to journal:</h2>
      <ul>
        <li>
          <img src={successIcon} alt="reasons why" /> Improves eloquence
        </li>
        <li>
          <img src={successIcon} alt="reasons why" /> Relieves stress
        </li>
        <li>
          <img src={successIcon} alt="reasons why" /> Progress tracking
        </li>
        <li>
          <img src={successIcon} alt="reasons why" /> Letting go of negative
          emotions
        </li>
        <li>
          <img src={successIcon} alt="reasons why" /> Progress tracking
        </li>
        <li>
          <img src={successIcon} alt="reasons why" /> Better memory
        </li>
      </ul>
      <div className="buttons">
        <Link to={"/sign-in"}>
          <button className="button">Sign In</button>
        </Link>
        <Link to={"/sign-up"}>
          <button className="button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HomePage);
