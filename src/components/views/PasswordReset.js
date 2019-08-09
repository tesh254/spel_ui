import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { handlePasswordReset } from "../../redux/actions/auth/passwordReset";
import "../../assets/css/forms.css";

class PasswordReset extends React.Component {
  state = {
    password: "",
    confirm: "",
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
        isLoading: nextProps.isLoading
      });
    } else {
      const { history } = this.props;
      setTimeout(() => {
        history.push("/login");
      }, 1000);
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { match, handlePasswordReset } = this.props;
    const userData = {
      password: this.state.password,
      confirm: this.state.confirm
    };
    handlePasswordReset(match.params.token, userData);
    this.setState({
      isLoading: false
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form">
          <h1>Password Reset</h1>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              className="form-group-input"
            />
          </div>
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
            <button
              id="button"
              className="btn btn-lg btn-black .btn-b"
              type="submit"
            >
              Update Password
            </button>
          </div>
        </div>
      </form>
    );
  }
}

PasswordReset.propTypes = {
  handlePasswordReset: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string
};

PasswordReset.defaultProps = {
  error: "",
  message: ""
};

const mapStateToProps = state => {
  return {
    error: state.login.error,
    message: state.login.message
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { handlePasswordReset }
  )(PasswordReset)
);
