import { Fragment } from "react";
import classes from "./card.module.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { functionsFromStore } from "../../store/store";

const Card = (props) => {
  const dispath = useDispatch();
  const profileViewHandler = () => {
    props.layout("viewProfile");
    dispath(functionsFromStore.setViewProfileEmail(props.email));
  };
  return (
    <Fragment>
      <div className={classes.card}>
        <center>
          <img className={classes.image} src={props.potourl} />
          <br />
          <h2 className={classes.h2}>
            {props.firstname} {props.lastname}
          </h2>
        </center>
        <br />
        <button onClick={profileViewHandler} className={classes.button}>
          view profile
        </button>
      </div>
      <br />
    </Fragment>
  );
};

export default Card;
