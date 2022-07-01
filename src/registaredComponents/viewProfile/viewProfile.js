import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {useNavigate} from 'react-router-dom'
import { functionsFromStore } from "../../store/store";
import loadingClasses from "../../loading/loading.module.css";
import classes from "./viewProfile.module.css";

const ViewProfile = (props) => {
  const navigate = useNavigate()
  const emailOfPerson = useSelector((state) => state.viewUserEmail);
  const myEmail = useSelector((state) => state.person.email);
  const myInfo = useSelector((state) => state.person);
  const [friends, setFriends] = useState(false);
  const dispatch = useDispatch();
  const [personInformation, setPersonInformation] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(emailOfPerson)
  useEffect(() => {
    if(!emailOfPerson || emailOfPerson.length == 0 || emailOfPerson == undefined){
      navigate('/people',{replace : true})
    }
    setLoading(true);
    axios
      .post("http://localhost:5000/getPersonByEmail", { email: emailOfPerson })
      .then((response) => {
        
        setPersonInformation(response.data[0]);
        let myEmailForTable = "";
        for (var i = 0; i < myEmail.length; i++) {
          if (myEmail[i] != "." && myEmail[i] != "@") {
            myEmailForTable += myEmail[i];
          }
        }
        console.log(myEmailForTable)
        axios
          .post("http://localhost:5000/isfriend", {
            tableName: myEmailForTable,
            email: emailOfPerson,
          })
          .then((response) => {
            if (response.data == "not friends") {
              setFriends(false);
              setLoading(false);
            }
            if (response.data == "friends") {
              setFriends(true);
              setLoading(false);
            }
          });
      });
  }, [friends, emailOfPerson]);

  const openChatHandler = () => {
    setLoading(true);
    console.log(myEmail);
    console.log(emailOfPerson);
    dispatch(functionsFromStore.chaterEmail(emailOfPerson));
    axios
      .post("http://localhost:5000/existtable", {
        senterEmail: myEmail,
        reciverEmail: emailOfPerson,
      })
      .then((response) => {
        console.log(response);
        props.chat(true);
        setLoading(false);
      });
  };

  const addFriendHandler = () => {
    setLoading(true);
    let myEmailForTable = "";
    for (var i = 0; i < myEmail.length; i++) {
      if (myEmail[i] != "." && myEmail[i] != "@") {
        myEmailForTable += myEmail[i];
      }
    }
    let userEmailForTable = "";
    for (var i = 0; i < personInformation.email.length; i++) {
      if (
        personInformation.email[i] != "." &&
        personInformation.email[i] != "@"
      ) {
        userEmailForTable += personInformation.email[i];
      }
    }
    userEmailForTable += "friends";
    myEmailForTable += "friends";

    axios
      .post("http://localhost:5000/addfriend", {
        info1: myInfo,
        info2: personInformation,
        emailForTable1: myEmailForTable,
        emailForTable2: userEmailForTable,
      })
      .then((response) => {
        dispatch(functionsFromStore.changeneedable());
        setFriends(true);
        setLoading(false);
      });
  };

  const removeFriendHandler = () => {
    setLoading(true);
    let myEmailForTable = "";
    for (var i = 0; i < myEmail.length; i++) {
      if (myEmail[i] != "." && myEmail[i] != "@") {
        myEmailForTable += myEmail[i];
      }
    }
    let userEmailForTable = "";
    for (var i = 0; i < personInformation.email.length; i++) {
      if (
        personInformation.email[i] != "." &&
        personInformation.email[i] != "@"
      ) {
        userEmailForTable += personInformation.email[i];
      }
    }
    userEmailForTable += "friends";
    myEmailForTable += "friends";

    axios
      .post("http://localhost:5000/removeFriend", {
        info1: myInfo,
        info2: personInformation,
        emailForTable1: myEmailForTable,
        emailForTable2: userEmailForTable,
      })
      .then((response) => {
        dispatch(functionsFromStore.changeneedable());
        setFriends(false);
        setLoading(false);
      });
  };

  const backHandler = () => {
    navigate(-1, {replace:true})
    dispatch(functionsFromStore.setViewProfileEmail(""));
  };
  if (loading) {
    return (
      <div className={classes.card}>
        <div className={loadingClasses["lds-dual-ring"]}></div>
      </div>
    );
  }
  return (
    <div className={classes.card}>
      <center>
        <img className={classes.image} src={personInformation.potorul} />
        <h2>
          {personInformation.firstname} {personInformation.lastname}
        </h2>
      </center>
      <div>
        <br />
        <p>nickname : {personInformation.nickname}</p>
        <p>email : {personInformation.email}</p>
        <br />
        {!friends && (
          <button onClick={addFriendHandler} className={classes.button}>
            add to friends
          </button>
        )}

        <br />
        {friends && (
          <div>
            <button onClick={removeFriendHandler} className={classes.button}>
              remove from friends
            </button>
            <br />
            <br />
            <button
              id="btn"
              onClick={openChatHandler}
              className={classes.button}
            >
              start chat
            </button>
          </div>
        )}

        <br />

        <button onClick={backHandler} className={classes.button1}>
          back
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
