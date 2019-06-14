import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

import userIcon from "../images/user.png";
import historyIcon from "../images/history.png";
import settingsIcon from "../images/settings.png";
import logoutIcon from "../images/logout.png";

const Navbar = ({ auth: { user }, logout }) => {
  let username = "";

  if (user) {
    username = user.username;
  }

  return (
    <div className="Navbar">
      <div className="left">
        <Link to={"/user-page"}>
          <button>
            Welcome {username}
            <img src={userIcon} alt="user" />
          </button>
        </Link>
      </div>
      <div className="right">
        <Link to={"/history"}>
          <button>
            History <img src={historyIcon} alt="history" />
          </button>
        </Link>
        <Link to={"/settings"}>
          <button>
            Settings <img src={settingsIcon} alt="settings" />
          </button>
        </Link>

        <button onClick={() => logout()}>
          Log Out <img src={logoutIcon} alt="logout" />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
