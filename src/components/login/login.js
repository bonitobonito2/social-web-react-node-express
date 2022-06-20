import React, { useState } from "react";
import './login.css'
import InputHook from "../../hooks/useInput";
import loadingClasses from '../../loading/loading.module.css'
import axios from "axios";
import {useDispatch} from 'react-redux'
import { functionsFromStore } from "../../store/store";
const Login = (props)=>{


  const [isLoading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const login = (email,password)=>{
        setLoading(true)
              axios.post('http://localhost:5000/login',{email : email,password: password})
              .then(response =>{
                if(response.data != 'failed registration'){
                  localStorage.setItem('isLoggined',1)
                  console.log(response.data)
                  localStorage.setItem('ID',response.data[0]['ID'])
                  dispatch(functionsFromStore.startChangeLoginInfo(localStorage.getItem('isLoggined')))
                 
                  props.isloggined(localStorage.getItem('isLoggined'))
                  dispatch(functionsFromStore.changeUserInformationPlus(response.data[0]))

                }
                setLoading(false)
              })
            
      }
  const {
    inputValue : emailInput,
    nameClassName : classEmail,
    changeHandlerFun : EmailChangeHandler,
    focusHandler:lostFocusEmail} = InputHook('email')

    const {
      inputValue : passwordInput,
      nameClassName : passwordclass,
      changeHandlerFun : passwordChangeHandler,
      focusHandler:passwordFocus} = InputHook('password')  

    const submitHandler = (event)=>{
      if(classEmail != 'invalid' && passwordclass != 'invalid'){
        event.preventDefault()
        login(emailInput,passwordInput)
      }else{
        alert('shigxoargak')
      }
    
    }
    return <div class="login-form">
    <form onSubmit={submitHandler}>
      <h1>Login</h1>
      <div class="content">
        <div  class="input-field">
          <input class = {classEmail}  onChange={EmailChangeHandler} onBlur ={lostFocusEmail} type="email" placeholder="Email" />
        </div>
        <div class="input-field">
          <input class = {passwordclass} onChange ={ passwordChangeHandler} onBlur = {passwordFocus} type="password" placeholder="Password" autocomplete="new-password" />
        </div>
        <a href="#" class="link">Forgot Your Password?</a>
      </div>
      <div class="action">
      
        <button>Sign in</button>
      </div>
    </form>
    <br/>
  <div class = 'loadingDiv'>
  {isLoading && <div className={loadingClasses['lds-dual-ring']}></div>}
  </div>
 
  </div>
}

export default Login