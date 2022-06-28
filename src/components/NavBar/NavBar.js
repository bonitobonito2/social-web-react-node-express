import React, { useState } from "react";
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
        <a
          onClick={navLoginHandler}
          class={actived === "login" && Classes.active}
          href="#"
        >
          login
        </a>
      </li>
      <li>
        <a
          onClick={navRegistarHandler}
          class={actived === "registar" && Classes.active}
          href="#"
        >
          registar
        </a>
      </li>
    </div>
  );
};

export default NavBar;
