import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/imgs/logo.svg";
import "../../assets/css/header.css";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div class="logo-holder">
            <NavLink to="/">
              <a>
                <img src={Logo} alt="mascot-logo" className="logo" />
              </a>
            </NavLink>
          </div>
          <input type="checkbox" id="nav-toggle" class="nav-toggle" />
          <nav>
            <ul className="menu-list">
              <li className="menu-list-item">
                <NavLink to="/challenges">
                  <a>Challenges</a>
                </NavLink>
              </li>
              <li className="menu-list-item">
                <NavLink to="/search">
                  <a>Search</a>
                </NavLink>
              </li>
              <li className="menu-list-item">
                <NavLink to="/login">
                  <a className="nav-btn">Get Started</a>
                </NavLink>
              </li>
            </ul>
          </nav>
          <label for="nav-toggle" class="nav-toggle-label">
            <span />
          </label>
        </header>
      </div>
    );
  }
}

export default Navbar;
