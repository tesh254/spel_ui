import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import signupUser from "../../redux/actions/auth/signup";
import "../../assets/css/forms.css";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    name: "",
    confirm: "",
    username: "",
    checked: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
        isLoading: nextProps.isLoading
      });
    }
  }

  handleCheck = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      confirm: this.state.confirm,
      username: this.state.username
    };
    const { checked } = this.state;

    if (checked) {
      this.props.signupUser(userData);
      this.setState({ isLoading: false });
    } else {
      toast.error("Please accept the terms of service and privacy");
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form">
          <h1>Sign Up</h1>
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
            <label htmlFor="email">Username</label>
            <br />
            <input
              type="text"
              name="username"
              className="form-group-input"
              value={this.state.username}
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              name="name"
              className="form-group-input"
              value={this.state.name}
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
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirm"
              className="form-group-input"
              value={this.state.confirm}
              onChange={this.onChange}
              required
            />
            <br />
            <span className="checkbox-status">
              <input
                type="checkbox"
                onChange={this.handleCheck}
                defaultChecked={this.state.checked}
                className="checkbox"
              />
              <span className="checkbox-statement">
                <Link to="/toc" className="link-grey">
                  Accept terms of service and privacy
                </Link>
              </span>
            </span>
            <br />
            <button
              id="button"
              className="btn btn-lg btn-black .btn-b"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="extras">
            <Link to="/login" className="link-grey">
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

SignUp.propTypes = {
  signupUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string
};

SignUp.defaultProps = {
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
    { signupUser }
  )(SignUp)
);
