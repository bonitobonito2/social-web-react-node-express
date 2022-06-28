import classes from "./sentToMeMessage.module.css";

const SendTome = (props) => {
  return (
    <div className={classes.chatMainchat}>
      <img className={classes.chatPic} src={props.image} />
      <p>{props.sms}</p>
    </div>
  );
};

export default SendTome;
