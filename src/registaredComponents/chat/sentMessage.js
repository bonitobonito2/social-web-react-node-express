import classes from './sentMessage.module.css'


const Sent =(props)=>{
    return   <div className={classes.chatMainchat1}>
    <p>{props.sms}</p>
        </div>
}

export default Sent