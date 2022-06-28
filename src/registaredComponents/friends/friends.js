import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { functionsFromStore } from "../../store/store";
import { useRef } from "react";
import classes from "./friends.module.css";

const Friends = (props) => {
  const friendName = useRef();
  const myEmail = useSelector((state) => state.person.email);
  const [friends, setFriends] = useState([]);
  const dispath = useDispatch();
  let needable = useSelector((state) => state.needable);
  let [email, setEmail] = useState("");
  console.log(email);
  let myEmailForTable = "";
  for (var i = 0; i < myEmail.length; i++) {
    if (myEmail[i] != "." && myEmail[i] != "@") {
      myEmailForTable += myEmail[i];
    }
  }
  const profileViewHandler = (email) => {
    props.layout("viewProfile");
    console.log(email);
    dispath(functionsFromStore.setViewProfileEmail(email));
  };
  useEffect(() => {
    console.log(myEmailForTable);
    axios
      .post("http://localhost:5000/getallfriend", {
        tableName: myEmailForTable,
      })
      .then((response) => {
        if (response.data.length == 0) {
          setFriends([]);
        } else {
          setFriends(response.data);
        }
      });
  }, [myEmailForTable, needable]);
  const changeHandler = () => {
    const information = friendName.current.value;

    let name = "";
    let lastname = "";
    let couunter = 0;
    for (var i = 0; i < information.length; i++) {
      if (information[i] != " " && couunter == 0) {
        name += information[i];
      } else if (information[i] != " " && couunter == 1) {
        lastname += information[i];
      } else if (information[i] == " ") {
        couunter++;
      }

      if (couunter == 2) {
        break;
      }
    }

    axios
      .post("http://localhost:5000/getallfriendbyname", {
        tableName: myEmailForTable,
        name: name,
        lastname: lastname,
      })
      .then((response) => {
        if (response.data.length == 0) {
          setFriends([]);
        } else {
          setFriends(response.data);
        }
      });
  };
  console.log(friends);
  return (
    <div className={classes.card}>
      <div className={classes["card-itemh"]}>
        <h2>friends</h2>
      </div>
      <div className={classes.inputDiv}>
        <center>
          <input
            onChange={changeHandler}
            ref={friendName}
            placeholder="search friend"
          />
        </center>
      </div>
      <center>
        {friends.map((state) => (
          <div className={classes["card-item"]}>
            <button onClick={() => profileViewHandler(state.email)}>
              <img className={classes.img} src={state.potourl} />
              <h3>
                {state.name} {state.lastname}
              </h3>{" "}
            </button>
          </div>
        ))}
      </center>
    </div>
  );
};

export default Friends;
