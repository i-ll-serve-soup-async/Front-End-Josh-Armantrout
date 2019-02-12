import React from "react";
import souperdoupertext from "../../images/souper-douper-text.png";
import souperdoupericon from "../../images/souper-douper-icon.png";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  return (
    <header>
      <div className="nav-wrapper">
        <div className="icons">
          <img
            alt="souper douper logo"
            className="logo-icon"
            src={souperdoupericon}
          />
          <img
            alt="souper douper"
            className="text-icon"
            src={souperdoupertext}
          />
        </div>
        <div className="header-txt">
          <h2>Inventory Panel</h2>
        </div>
        <nav>
          <NavLink
            className="styled-link"
            activeClassName="selected-nav"
            exact
            to="/"
          >
            View
          </NavLink>
          <NavLink
            className="styled-link"
            activeClassName="selected-nav"
            exact
            to="/"
          >
            Add
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
