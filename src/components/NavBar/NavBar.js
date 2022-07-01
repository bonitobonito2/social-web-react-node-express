import React, { useState } from "react";
import {NavLink} from 'react-router-dom'
import Classes from "./NavBar.module.css";

const NavBar = (props) => {
  const [actived, setActived] = useState("login");
  const navLoginHandler = () => {
    props.layout("login");
    setActived("login");
  };

  const navRegistarHandler = () => {
    props.layout("registar");
    setActived("registar");
  };
  return (
    <div className={Classes.navBar}>
      <li>
        <NavLink className={(navData) =>navData.isActive ? Classes.active : ''} to='/login' >login</NavLink>
        {/* <a
          onClick={navLoginHandler}
          class={actived === "login" && Classes.active}
          href="#"
        >
          login
        </a> */}
      </li>
      <li>
      <NavLink className={(navData) =>navData.isActive ? Classes.active : ''} to='/registar' >registar</NavLink>
         
      </li>
    </div>
  );
};

export default NavBar;
