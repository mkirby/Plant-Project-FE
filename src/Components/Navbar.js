import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="site-name">
        <NavLink to="/">
          <h1>
            <i className="fas fa-leaf fa-inverse"></i> Plant Collector
          </h1>
        </NavLink>
      </div>
      <div className="nav-menu">
        <NavLink to="/search">
          <i class="fas fa-search"></i> Search
        </NavLink>
        <NavLink to="/collection">
          <i class="fas fa-th-large"></i> Collection
        </NavLink>
        {props.user ? (
          <NavLink to="/" onClick={props.logoutHandler}>
            <i class="fas fa-sign-out-alt"></i> Log Out
          </NavLink>
        ) : (
          <>
            <NavLink to="/signup">
              <i class="fas fa-user-plus"></i> Sign Up
            </NavLink>
            <NavLink to="/login">
              <i class="fas fa-sign-in-alt"></i> Log in
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
