import classes from './chatPerson.module.css'


const ChatPerson = (props)=>{
    const closeHandler =()=>{
        console.log('he')
        props.chat(false)
       }

    return    <div className={classes.personDiv}>

        <div className={classes.picDiv}>
            <img className={classes.profilepic} src={props.image} />
        </div>
    <div className={classes.personName}><p>{props.name}</p></div>

    <div className={classes.personChat}><button onClick={closeHandler} className={classes.closeBtn}>X</button></div>
</div>
}


export default ChatPerson