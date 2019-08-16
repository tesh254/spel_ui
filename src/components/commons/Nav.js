import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Logo from "../../assets/imgs/logo.svg";
import "../../assets/css/header.css";

class Navbar extends React.Component {
  state = {
    user: {},
    navbar: true,
    sidebar: false,
    showLogo: true,
    theme: localStorage.getItem("theme") || "light",
    checked: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: {
        avatar: nextProps.avatar,
        name: nextProps.name,
        username: nextProps.username,
        email: nextProps.email
      },
      checked: localStorage.getItem("theme") === "dark" ? true : false
    });
  }

  handleNavbarLinks = () => {
    const { user } = this.state;
    if (JSON.stringify(user) === JSON.stringify({}) || user.avatar === "") {
      return false;
    } else {
      return true;
    }
  };

  renderLoginLink = () => {
    if (!this.handleNavbarLinks()) {
      return (
        <ul className="menu-list">
          <li className="menu-list-item">
            <NavLink to="/login">
              <button className="btn btn-nav btn-medium btn-black">
                Log In
              </button>
            </NavLink>
          </li>
          <li className="menu-list-item">
            <NavLink to="/signup">
              <button className="btn btn-nav btn-md btn-black">Sign Up</button>
            </NavLink>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="menu-list">
          <li className="menu-list-item">
            <NavLink to="/notifications">
              <button className="btn btn-nav btn-md btn-black">
                <span role="img" aria-label="bell">
                  🚀
                </span>{" "}
                Create Challenge
              </button>
            </NavLink>
          </li>
          <li className="menu-list-item">
            <NavLink to="/notifications">
              <button className="btn btn-nav btn-md btn-black">
                <span role="img" aria-label="bell">
                  🔥
                </span>{" "}
                Trending
              </button>
            </NavLink>
          </li>
        </ul>
      );
    }
  };

  renderProfileAvatar = () => {
    if (this.handleNavbarLinks()) {
      return (
        <div className="profile-avatar" onClick={this.renderModal}>
          <img src={this.state.user.avatar} alt={this.state.user.username} />
        </div>
      );
    } else {
      return null;
    }
  };

  modalComponent = () => (
    <div className="modal-menu">
      <ul className="menu">
        <li className="menu-item">
          <NavLink to="/create-challenge">Create Challenge</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </div>
  );

  toggleSwitch = () => (
    <div className="switch-holder">
      <span className="title">Dark Theme</span>
      <label class="switch">
        <input
          type="checkbox"
          checked={this.state.checked}
          onClick={this.toggleTheme}
        />
        <span class="slider round" />
      </label>
    </div>
  );

  toggleTheme = () => {
    const { checked } = this.state;

    if (checked) {
      localStorage.setItem("theme", "light");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      this.setState({
        checked: false
      });
    } else {
      localStorage.setItem("theme", "dark");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      this.setState({
        checked: true
      });
    }
  };

  sidebar = () => (
    <div className="side-bar-menu">
      <div className="menu">
        <div className="logo-section">
          <img
            src={this.state.user.avatar || Logo}
            alt="mascot-logo"
            className="logo"
          />
          <div className="username">{this.state.user.name}</div>
        </div>
        <ul className="menu">
          <li className="menu-item">
            <NavLink to="/create-challenge">
              <span role="img" aria-label="rocket">
                🗄
              </span>{" "}
              Dashboard
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/create-challenge">
              <span role="img" aria-label="rocket">
                🤓
              </span>{" "}
              Profile
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/create-challenge">
              <span role="img" aria-label="rocket">
                🚀
              </span>{" "}
              Create Challenge
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/notifications">
              <span role="img" aria-label="bell">
                🔔
              </span>{" "}
              <span className="banner">0</span> Notifications
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/trending">
              <span role="img" aria-label="fire">
                🔥
              </span>{" "}
              Trending
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/toc">
              <span role="img" aria-label="fire">
                📜
              </span>{" "}
              Terms of Service
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/privacy">
              <span role="img" aria-label="fire">
                🔒
              </span>{" "}
              Privacy
            </NavLink>
          </li>
        </ul>
        {this.toggleSwitch()}
      </div>
    </div>
  );

  handleShowSidebar = () => {
    const { sidebar } = this.state;
    const { location } = this.props;
    if (location === "/login" || location === "/signup") {
      this.setState({
        sidebar: false
      });
    } else if (sidebar) {
      this.setState({
        sidebar: false
      });
    } else {
      this.setState({
        sidebar: true
      });
    }
  };

  render() {
    const { sidebar } = this.state;

    return (
      <div>
        <header>
          <div className="navbar-holder" onClick={this.handleShowSidebar}>
            <div />
            <div />
            <div />
          </div>
          <div class="logo-holder">
            <NavLink to="/">
              <img src={Logo} alt="mascot-logo" className="logo" />
            </NavLink>
          </div>
          <nav>
            <ul className="menu-list">{this.renderLoginLink()}</ul>
          </nav>
        </header>
        {sidebar ? this.sidebar() : null}
      </div>
    );
  }
}

Navbar.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string
};

Navbar.defaultProps = {
  avatar: "",
  username: "",
  name: "",
  email: ""
};

const mapStateToProps = state => ({
  avatar: state.login.user.avatar,
  username: state.login.user.username,
  name: state.login.user.name,
  email: state.login.user.email
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Navbar)
);
