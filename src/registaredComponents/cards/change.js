import { Fragment, useRef,useState} from 'react'
import classes from './change.module.css'
import  ReactDOM  from 'react-dom'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import loadingClasses from '../../loading/loading.module.css'

const Overlay = ()=>{
    return <div  className={classes.backdrop}>

    </div>
}


const Change = (props)=>{
    const information = useSelector(state => state.person)
    const firstname = useRef()
    const lastname = useRef()
    const nickname = useRef()
    const password = useRef()
    const [isLoading,setIsLoading] = useState(false)
    const [firstname1,setFirstname1] = useState(information['firstname'])
    const [lastname1,setLastname1] = useState(information['lastname'])
    const [nickname1,setNickname1] = useState(information['nickname'])
    const overlayId = document.getElementById('overlay')
    const change = (firstname,lastname,nickname,gmail)=>{
        axios.post('http://localhost:5000/update',{firstname : firstname,lastname:lastname,nickname:nickname,email : gmail})
        .then(response =>{
           console.log(response)
           setIsLoading(false)
          
        })

    }
    const submitHandler = (event)=>{
        setIsLoading(true)
        event.preventDefault()
        console.log(firstname.current.value)
        if(information['password'] == password.current.value.trim()){
            if(firstname.current.value.trim().length > 3 &&  lastname.current.value.trim().length > 5 && nickname.current.value.trim().length > 5){
                change(firstname.current.value,lastname.current.value,nickname.current.value,information['email'])
          
                cancelHandler()
            }else{
                setIsLoading(false)
                alert('wrong inputs')
            }
        }else{
            alert('wrong password')
            setIsLoading(false)
        }
    }
    const cancelHandler = ()=>{
        props.change(false)
    }
    return<Fragment>
        {ReactDOM.createPortal(<Overlay />, overlayId)}
        <div className={classes.card} >
            <form onSubmit={submitHandler}>
           <label >First name:</label>
           <br/>
            <input onChange={()=>setFirstname1(firstname.current.value)} ref={firstname} type='text' value = {firstname1} />
            <br/>
            <label >last name:</label>
            <input onChange={()=>setLastname1(lastname.current.value)} ref = {lastname} type='text' value = {lastname1} />
            
            <br/>
            <label >Nickname:</label>
            <input onChange={()=>setNickname1(nickname.current.value)} ref = {nickname} type='text' value = {nickname1} />
            <br/>
            <label >Submit password:</label>
            <input ref = {password} className={classes.password} type='password' placeholder='password' />
            
           
            <br />
            <input type='submit' value='change my information' />
            <button onClick={cancelHandler} className={classes.btn}  > cancel</button>
            </form>
            <center>
            {isLoading && <div className={loadingClasses['lds-dual-ring']}></div>} 
            </center>
           

        </div>
    </Fragment>
  
}


export default Change