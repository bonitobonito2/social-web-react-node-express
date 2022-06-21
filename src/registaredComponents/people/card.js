import { Fragment } from 'react'
import classes from './card.module.css'


const Card = (props)=>{

    return <Fragment>
       
<div className={classes.card}>
    <center>
    <img className={classes.image} src={props.potourl} />
    <br/>
    <h2>{props.firstname} {props.lastname}</h2>
    </center>
    <br/>
  <div className={classes.cardDiv}>
        <p>nickname : {props.nickname}</p>
        <p>email : {props.email}</p>
        <br/>
       
  </div>
  <button className={classes.button} >add friend</button>
       
       
    </div>
    <br/>
    </Fragment> 
}

export default Card