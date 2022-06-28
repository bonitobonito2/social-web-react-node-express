import { Fragment, useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./changeprofile.module.css";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";
const overlayId = document.getElementById("overlay");

const Overlay = (props) => {
  const closeHandler = () => {
    props.change(false);
    console.log("clicked");
  };
  return <div onClick={closeHandler} className={classes.backdrop}></div>;
};

const ChangeProfile = (props) => {
  const imageUrl = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    function checkImage(url) {
      var image = new Image();
      image.onload = function () {
        if (this.width > 0) {
          console.log("image exists");
          if (url.length > 20000) {
            alert("something went wrong");
          } else {
            axios
              .post("http://localhost:5000/updateImage", {
                id: localStorage.getItem("ID"),
                url: url,
              })
              .then((response) => {
                console.log(response);
                props.change(false);
              });
          }
        }
      };
      image.onerror = function () {
        alert("wrong image url :/ try again");
        imageUrl.current.value = "";
      };
      image.src = url;
    }
    checkImage(imageUrl.current.value);
  };
  const closeHandler = () => {
    props.change(false);
  };
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Overlay onClick={closeHandler} change={props.change} />,
        overlayId
      )}
      <div className={classes.card}>
        <form onSubmit={submitHandler}>
          <label>image url:</label>
          <input ref={imageUrl} type="text" required placeholder="image url" />
          <input className={classes.btn} type="submit" />
          <button onClick={closeHandler} className={classes.btn}>
            close
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ChangeProfile;
