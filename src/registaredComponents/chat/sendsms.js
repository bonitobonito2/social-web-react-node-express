import { useRef } from 'react'
import { useSelector } from 'react-redux'
import classes from './sendsms.module.css'
import axios from 'axios'
const Sendsms = (props)=>{
    const myEmail = useSelector(state=>state.person.email)
    const friendEmail = useSelector(state=>state.viewUserEmail)
    console.log(myEmail)
    console.log(friendEmail)
    const sms = useRef()
    const submitHandler =(event)=>{
        event.preventDefault()
        const message = sms.current.value.trim()
        sms.current.value = ''

        axios.post('http://localhost:5000/sendsms',{senderEmail : myEmail,reciverEmail : friendEmail,sms : message})
        .then(response=>{
            console.log(response.data)
            props.fetch(state=>!state)
        })
    }

    return <form onSubmit={submitHandler}>
        <div className={classes.sendDiv}>
        <input ref = {sms} placeholder="Aa" />
        <button >send</button>
        </div>
        </form>
       
 
}

export default Sendsms