import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { passwordResetRequest } from "../../redux/actions/auth/passwordReset";
import "../../assets/css/forms.css";

class ForgotPassword extends React.Component {
  state = {
    email: ""
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
        history.push("/");
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

    const userData = {
      email: this.state.email
    };

    this.props.passwordResetRequest(userData);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form">
          <h1>Password Reset</h1>
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
            <br />
            <button
              id="button"
              className="btn btn-lg btn-black .btn-b"
              type="submit"
            >
              Send Reset link
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ForgotPassword.propTypes = {
  passwordResetRequest: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string
};

ForgotPassword.defaultProps = {
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
    { passwordResetRequest }
  )(ForgotPassword)
);
