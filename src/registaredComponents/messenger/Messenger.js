import React, { Fragment, useRef } from "react";
import classes from "./Messenger.module.css";
import ChatPerson from "./chatPerson";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import SendTome from "./sentToMeMessage";
import Sent from "./sentMessage";
export default function Messenger() {
  const [chatPerson, setChatPerson] = useState();
  const [friends, setFriends] = useState([]);
  const [chater, setChater] = useState();
  const [chat, setChat] = useState();
  const sms = useRef();
  const myEmail = useSelector((state) => state.person.email);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  let myEmailForTable = "";
  useEffect(() => {
    if (chat || chater) {
      scrollToBottom();
    }
  }, [chat]);

  for (var i = 0; i < myEmail.length; i++) {
    if (myEmail[i] != "." && myEmail[i] != "@") {
      myEmailForTable += myEmail[i];
    }
  }

  const handler = (email) => {
    console.log(email);
    axios
      .post("http://localhost:5000/existtable", {
        senterEmail: myEmail,
        reciverEmail: email,
      })
      .then((response) => {
        console.log(response);
        axios
          .post("http://localhost:5000/getPersonByEmail", { email: email })
          .then((response) => {
            const gaga = response.data[0];
            console.log(gaga);
            setChater(gaga);
            setChatPerson(email);
            axios
              .post("http://localhost:5000/getchat", {
                senderEmail: myEmail,
                reciverEmail: email,
              })
              .then((response) => {
                setChat(response.data);
                console.log(response.data + "xdxdxd");
                scrollToBottom();
                setChatPerson(email);
              });
            scrollToBottom();
          });
      });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const message = sms.current.value.trim();
    if (message.length > 200) {
      alert("sms is too long, max length of sms 200 chars");
      return;
    }
    if (message.length == 0) {
      return;
    }
    sms.current.value = "";

    axios
      .post("http://localhost:5000/sendsms", {
        senderEmail: myEmail,
        reciverEmail: chatPerson,
        sms: message,
      })
      .then((response) => {
        console.log(response.data);
        handler(chatPerson);
        scrollToBottom();
      });
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
          console.log(response.data);
          setFriends(response.data);
          scrollToBottom();
        }
      });
  }, [myEmailForTable]);
  console.log(chater);

  // if(chater){
  //   setName(`${chater.name } ${chater.lastname}`)
  // }
  return (
    <div className={classes.card}>
      <div className={classes.friends}>
        <center>
          {friends.map((state) => (
            <div className={classes["card-item"]}>
              <button onClick={() => handler(state.email)}>
                <img className={classes.img} src={state.potourl} />
                <h3>
                  {state.name} {state.lastname}
                </h3>{" "}
              </button>
            </div>
          ))}
        </center>
      </div>

      <div className={classes.chat}>
        {!chatPerson && <p>{`  <<select friend`}</p>}
        {chatPerson && (
          <Fragment>
            <ChatPerson
              name={chater.firstname}
              lastname={chater.lastname}
              image={chater.potorul}
              chat={chat}
            />
            <form onSubmit={submitHandler}>
              <div className={classes.sendDiv}>
                <input ref={sms} placeholder="Aa" />
                <button>send</button>
              </div>
            </form>

            <div className={classes.chatElement}>
              <div className={classes.chatElement1}>
                <ChatPerson
                  name={chater.firstname}
                  lastname={chater.lastname}
                  image={chater.potorul}
                  chat={chat}
                />
                <form onSubmit={submitHandler}>
                  <div className={classes.sendDiv}>
                    <input ref={sms} placeholder="Aa" />
                    <button>send</button>
                  </div>
                </form>
                {chat &&
                  chat.map((state) =>
                    state.recivedsms == "null" ? (
                      <Sent sms={state.mysms} />
                    ) : (
                      <SendTome sms={state.recivedsms} image={chater.potorul} />
                    )
                  )}
              </div>
              <div ref={messagesEndRef} />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
