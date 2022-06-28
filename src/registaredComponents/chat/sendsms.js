import { useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./sendsms.module.css";
import axios from "axios";
const Sendsms = (props) => {
  const myEmail = useSelector((state) => state.person.email);
  const friendEmail1 = useSelector((state) => state.chatWithEmail);
  const sms = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const message = sms.current.value.trim();
    if (message.length > 35) {
      alert("sms is too long, max length of sms 30 chars");
      return;
    }
    if (message.length == 0) {
      return;
    }
    sms.current.value = "";

    axios
      .post("http://localhost:5000/sendsms", {
        senderEmail: myEmail,
        reciverEmail: friendEmail1,
        sms: message,
      })
      .then((response) => {
        console.log(response.data);
        props.fetch((state) => !state);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.sendDiv}>
        <input max="40" ref={sms} placeholder="Aa" />
        <button>send</button>
      </div>
    </form>
  );
};

export default Sendsms;
