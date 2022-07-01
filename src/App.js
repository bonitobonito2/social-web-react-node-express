import { Fragment, useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Body from "./registaredComponents/body";
import Login from "./components/login/login";
import Registar from "./components/registar/registar";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { functionsFromStore } from "./store/store";
function App() {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.isLoggined);
  console.log("aq kide ertxel shemovedi");
  const [isLoggined, setLoggined] = useState(
    localStorage.getItem("isLoggined")
  );
  useEffect(() => {
    dispatch(functionsFromStore.startChangeLoginInfo(isLoggined));
  }, [isLoggined]);
  const logut = () => {
    localStorage.setItem("isLoggined", 0);
    localStorage.setItem("ID", 0);

    setLoggined(localStorage.getItem("isLoggined"));
  };

  if (loginInfo == 0 || loginInfo == null) {
    return (
      <Fragment>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registar" element={<Registar />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Fragment>
    );
  } else {
    return <Body logut={logut} />;
  }
}

export default App;
