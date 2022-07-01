import React, { Fragment, useState } from "react";
import NavBarLogined from "./navbar1/NavBarLogined";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Profile from "./profile/profile";
import ViewProfile from "./viewProfile/viewProfile";
import People from "./people/people";
import Messenger from "./messenger/Messenger";
import Chat from "./chat/chat";
import { useEffect } from "react";
import axios from "axios";
import { functionsFromStore } from "../store/store";
import { useDispatch } from "react-redux";
import Friends from "./friends/friends";
const Body = (props) => {
  const dispatch = useDispatch();
  const [activatedFriends, setActivatedFriends] = useState(false);
  const [activeChat, setActivChat] = useState(false);
  const [layout, setLayout] = useState("profile");

  useEffect(() => {
    axios
      .post("http://localhost:5000/byId", { id: localStorage.getItem("ID") })
      .then((response) => {
        const takeInformation = response.data[0];
        console.log(takeInformation[0]);
        dispatch(
          functionsFromStore.changeUserInformationPlus(response.data[0])
        );
      });
  }, []);

  return (
    <Fragment>
      <NavBarLogined
        activatedFriends={activatedFriends}
        setActivatedFriends={setActivatedFriends}
      />
      {layout == "viewProfile" && (
        <ViewProfile chat={setActivChat} layout={setLayout} />
      )}
      {activeChat && <Chat chat={setActivChat} />}
      {activatedFriends && <Friends layout={setLayout} />}

      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/people" element={<People />} />
        <Route
          path="/people/:gmail"
          element={<ViewProfile chat={setActivChat} />}
        />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
    </Fragment>
  );
};

export default Body;
