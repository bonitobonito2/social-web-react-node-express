import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import classes from "./postItem.module.css";
function PostItem(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mhm = queryParams.get("show");
  console.log(mhm);
  const myEmail = useSelector((state) => state.person.email);
  console.log(myEmail);

  return (
    <div>
      {mhm === "mine" && props.email == myEmail ? (
        <div className={classes.card}>
          <div>
            <h2>
              {props.name} {props.lastname}
            </h2>
            <br />
            <p>{props.description}</p>
          </div>
          <div className={classes.img}>
            <img src={props.potourl} alt="item poto" />
          </div>
          <div className={classes.actions}>
            <button>like</button>
            <button>comment</button>
          </div>
          {myEmail === props.email && (
            <button className={classes.delete}>delete</button>
          )}
        </div>
      ) : null}
      {mhm !== "mine" && (
        <div className={classes.card}>
          <div>
            <h2>
              {props.name} {props.lastname}
            </h2>
            <br />
            <p>{props.description}</p>
          </div>
          <div className={classes.img}>
            <img src={props.potourl} alt="item poto" />
          </div>
          <div className={classes.actions}>
            <button>like</button>
            <button>comment</button>
          </div>
          {myEmail === props.email && (
            <button className={classes.delete}>delete</button>
          )}
        </div>
      )}
    </div>
  );
}

export default PostItem;
