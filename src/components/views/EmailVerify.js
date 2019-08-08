import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import verifyUser from "../../redux/actions/auth/verify";
import "../../assets/css/info.css";

class EmailVerify extends React.Component {
  state = {
    token: ""
  };

  componentDidMount() {
    const { verifyUser, match } = this.props;
    verifyUser(match.params.token)
  }

  render() {
      console.log(this.props)
    return (
      <div className="verify-content">
        <div className="email-verify-view">
            <span>
                If a green toast message appeared, Congrats
                your account has been verified 🎉🥳🥂.
                <br/>
                Go ahead and login to your account
            </span>
          <div className="email-verify-button">
            <Link to="/login">
              <button className="btn btn-lg btn-black">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

EmailVerify.propTypes = {
  verifyUser: PropTypes.func.isRequired
};

EmailVerify.defaultProps = {};

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
    { verifyUser }
  )(EmailVerify)
);
