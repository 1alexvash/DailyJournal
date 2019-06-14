import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";

const SignIn = ({ auth, login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!auth.loading && auth.isAuthenticated) {
    return <Redirect to={"/user-page"} />;
  }

  function signIn(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      login(email, password);
    }
  }

  return (
    <form onSubmit={e => signIn(e)} className="Sign-in">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        onChange={e => setPassword(e.target.value)}
        required
      />
      <input type="submit" value="Sign In" />
    </form>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(SignIn);
