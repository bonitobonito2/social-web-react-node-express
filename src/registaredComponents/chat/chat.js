import { Fragment, useEffect, useState } from 'react'
import classes from './chat.module.css'
import SendTome from './sentToMeMessage'
import { useSelector } from 'react-redux'
import Sent from './sentMessage'
import ChatPerson from './chatPerson'
import axios from 'axios'
import Sendsms from './sendsms'
const Chat = (props)=>{
    const friendEmail = useSelector(state=>state.viewUserEmail)
    const myEmail = useSelector(state=>state.person.email)
    const [fetch,setfetch] = useState(false)
    const [chat,setChat] = useState([])
    console.log(myEmail)
    const [chater,setChater] = useState([])

    useEffect(()=>{
        axios.post('http://localhost:5000/getPersonByEmail',{email: friendEmail})
        .then(response=>{
          
            const gaga = response.data[0]
            setChater(gaga)  
        })

        axios.post('http://localhost:5000/getchat',{senderEmail : myEmail,reciverEmail : friendEmail})
        .then(response=>{
            console.log(response.data)
       
            setChat(response.data)
        })


    },[fetch])
    const idk = chat.map(state =>{})
    console.log(chat)
    const name = `${chater.firstname} ${chater.lastname}`
    return<Fragment>
<div id='messageBody' className={classes.chatMain}>
            <div id= 'div' className={classes.chatMain1}>
            <ChatPerson 
            name = {name}
            image = {chater.potorul}
             chat = {props.chat} />
            <mhm />
            <Sendsms fetch = {setfetch} />
            {chat.map(state=>  state.recivedsms == 'null'  ?  <Sent sms = {state.mysms}/> : <SendTome sms = {state.recivedsms} image = {chater.potorul}/>  
            )}
            </div>
    </div>
    </Fragment> 
}

export default Chat