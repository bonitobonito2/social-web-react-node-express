import React from "react";
import { NavLink } from "react-router-dom";
import Classes from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={Classes.navBar}>
      <li>
        <NavLink
          className={(navData) => (navData.isActive ? Classes.active : "")}
          to="/login"
        >
          login
        </NavLink>
      </li>
      <li>
        <NavLink
          className={(navData) => (navData.isActive ? Classes.active : "")}
          to="/registar"
        >
          registar
        </NavLink>
      </li>
    </div>
  );
};

export default NavBar;
