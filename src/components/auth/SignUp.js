import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { connect } from "react-redux";

const SignUp = ({ auth, register }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  if (!auth.loading && auth.isAuthenticated) {
    return <Redirect to={"/user-page"} />;
  }

  function signUp(e) {
    e.preventDefault();

    if (
      (username !== "",
      email !== "",
      password !== "",
      password === repeatPassword)
    ) {
      register({ username, email, password });
    }
  }

  return (
    <form onSubmit={e => signUp(e)} className="Sign-up">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        onChange={e => setUsername(e.target.value)}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
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
      <label htmlFor="repeatpassword">Repeat Password</label>
      <input
        type="password"
        id="repeatpassword"
        onChange={e => setRepeatPassword(e.target.value)}
        required
      />
      <input type="submit" value="Sign Up" />
    </form>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register }
)(SignUp);
