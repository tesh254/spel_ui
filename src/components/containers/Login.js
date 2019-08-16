import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import loginUser from "../../redux/actions/auth/login";
import "../../assets/css/forms.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
        isLoading: nextProps.isLoading
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form">
          <h1>Log In</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              className="form-group-input"
              value={this.state.email}
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              className="form-group-input"
              value={this.state.password}
              onChange={this.onChange}
              required
            />
            <br />
            <button
              id="button"
              className="btn btn-lg btn-black .btn-b"
              type="submit"
            >
              Log In
            </button>
          </div>
          <div className="extras">
            <Link to="/forgot-password" className="link-grey">
              Forgot password?
            </Link>
            <br />
            <br />
            <Link to="/signup" className="link-grey">
              Create a new account?
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string
};

Login.defaultProps = {
  error: "",
  message: ""
};

const mapStateToProps = state => {
  return {
    error: state.login.error,
    message: state.login.message,
    isLoggedIn: state.login.isLoggedIn
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(Login)
);
