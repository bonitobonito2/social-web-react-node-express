import { Fragment, useEffect, useRef, useState } from 'react'
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
    const [loading,setLoading] = useState(false)
    const [chater,setChater] = useState([])
    const [changer,setChanger] = useState(false)
    const friendEmail1 = useSelector(state=>state.chatWithEmail)
    const bottomRef = useRef();
  
    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
  

    useEffect(()=>{
        setInterval(()=>{
            setChanger(state=>!state)
        },[1500])
      
    },[])


    
    useEffect(() => {
        scrollToBottom()
    }, [fetch])


    useEffect(()=>{
        axios.post('http://localhost:5000/getPersonByEmail',{email: friendEmail1})
        .then(response=>{
          
            const gaga = response.data[0]
            setChater(gaga)  
        })

        axios.post('http://localhost:5000/getchat',{senderEmail : myEmail,reciverEmail : friendEmail1})
        .then(response=>{
            setChat(response.data)
        })


    },[fetch,changer,friendEmail1])
    console.log(chat)
    const name = `${chater.firstname} ${chater.lastname}`
    if(loading == true){
        return <div>
            <p>loading...</p>
        </div>
    }
    return<Fragment>
        
<div ref = {bottomRef}  className={classes.chatMain}>
            <div  id= 'div' className={classes.chatMain1}>
            <ChatPerson 
          
            name = {name}
            image = {chater.potorul}
             chat = {props.chat} />
            <mhm />
            <Sendsms  fetch = {setfetch} />
            {chat.map(state=>  state.recivedsms == 'null'  ?  <Sent sms = {state.mysms}/> : <SendTome  sms = {state.recivedsms} image = {chater.potorul}/>  
            )}
            </div>
    </div>
    </Fragment> 
}

export default Chat