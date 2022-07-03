import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Classes from "./NavBarLogined.module.css";
import { functionsFromStore } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";

const NavBarLogined = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const picurl = useSelector((state) => state.person);
  const navLogoutHandler = () => {
    localStorage.setItem("ID", 0);
    localStorage.setItem("isLoggined", 0);
    dispatch(
      functionsFromStore.startChangeLoginInfo(
        localStorage.getItem("isLoggined")
      )
    );
    dispatch(
      functionsFromStore.changeUserInformationPlus({
        firstname: "",
        lastname: "",
        nickname: "",
        email: "",
        password: "",
        potorul: "",
      })
    );
    navigate("/login", { replace: true });
  };

  const navProfileHandler = () => {
    navigate("/profile", { replace: true });
  };

  const friendsHandler = () => {
    props.setActivatedFriends((state) => !state);
  };

  return (
    <div className={Classes.navBar}>
      <img
        onClick={navProfileHandler}
        className={Classes.img}
        src={picurl.potourl}
      />
      <li onClick={navLogoutHandler} className={Classes.logout}>
        <img
          alt="log out"
          src="https://www.seekpng.com/png/full/41-413813_shutdown-button-clipart-arrow-icon-logout-white-png.png"
        />
      </li>

      <li>
        <a
          id="friends"
          onClick={friendsHandler}
          class={props.activatedFriends && Classes.active}
          href="#"
        >
          friends
        </a>
      </li>
      <li>
        <NavLink
          className={(navData) => (navData.isActive ? Classes.active : "")}
          to="/people"
        >
          people
        </NavLink>
      </li>

      <li>
        <NavLink
          className={(navData) => (navData.isActive ? Classes.active : "")}
          to="/messenger"
        >
          messenger
        </NavLink>
      </li>

      <li>
        <NavLink
          className={(navData) => (navData.isActive ? Classes.active : "")}
          to="/craetePost"
        >
          create post
        </NavLink>
      </li>

      <li>
        <NavLink
          className={(navData) => (navData.isActive ? Classes.active : "")}
          to="/posts"
        >
          posts
        </NavLink>
      </li>
    </div>
  );
};

export default NavBarLogined;
