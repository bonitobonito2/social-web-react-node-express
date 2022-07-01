import classes from "./chatPerson.module.css";

const ChatPerson = (props) => {
  const closeHandler = () => {
    console.log("he");
    props.chat(false);
  };

  return (
    <div className={classes.personDiv}>
      <div className={classes.picDiv}>
        <img className={classes.profilepic} src={props.image} />
      </div>
      <div className={classes.personName}>
        <p>
          {props.name} {props.lastname}
        </p>
      </div>

      <div className={classes.personChat}></div>
    </div>
  );
};

export default ChatPerson;
