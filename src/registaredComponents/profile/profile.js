import React, { Fragment, useEffect, useState } from "react";
import classes from './profile.module.css'

import { functionsFromStore } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import loadingClasses from '../../loading/loading.module.css'
import axios from "axios";
import Change from "../cards/change";
import ChangeProfile from "../cards/changeprofile";

const Profile = ()=>{
    const dispatch = useDispatch()
    const [isLoading,setLoading] = useState(false)
    const [change,setChange] = useState(false)
    const [changeProfile,setChangeProfile] = useState(false)
    const [imagelinkk,setImageLink] = useState('')
    const deleteAcountHandler=()=>{
        setLoading(true)
        const mhm = prompt('delete account? "yes"')
       if(mhm){
        if(mhm.trim() == 'yes'){
            
            axios.post('http://localhost:5000/deleteaccount',{id : localStorage.getItem('ID'), email : information['email']})
            .then(response=>{
            console.log(response)    
            localStorage.setItem('ID',0)
            localStorage.setItem('isLoggined' , 0)
            dispatch(functionsFromStore.startChangeLoginInfo(localStorage.getItem('isLoggined')))
            dispatch(functionsFromStore.changeUserInformationPlus({
                firstname: '',
                lastname: '',
                nickname : '',
                email : '',
                password : '',
                potorul : ''
            }))
            })
            alert('account deleted')
            setLoading(false)
        }
       }
        setLoading(false)
      
    }
    useEffect(()=>{
        setLoading(true)
        axios.post('http://localhost:5000/byId',{id : localStorage.getItem('ID')})
        .then(response =>{
            const takeInformation = response.data[0]
            console.log(takeInformation[0])
            dispatch(functionsFromStore.changeUserInformationPlus(response.data[0]))
            setLoading(false)
           setImageLink(response.data[0].potorul)
        
        })
    
    },[change,changeProfile])

    const information = useSelector(state => state.person)
      
    
    if(isLoading){
    return<div className={classes.card}>
    <div className={loadingClasses['lds-dual-ring']}></div>
    </div> 
    }
    return <Fragment>
        {change && <Change change = {setChange} />}
        {changeProfile && <ChangeProfile change = {setChangeProfile} />}
       
        <div  className={classes.card}>
     <center>
        <img className={classes.image} src= {imagelinkk} />
        <br/>
     <h2>{information['firstname']} {information['lastname']}</h2>
     </center>
     <br/>
      
        <p>nickname : {information['nickname']}</p>
        <br/>
        <p> email : {information['email']}</p>
        
      
      <br/>
      <button onClick={()=>setChange(!change)} className={classes.button} >change my information</button>
      <br />
      <button  onClick={()=>setChangeProfile(!changeProfile)} className={classes.buttonChangeProfile} >change profile picture</button>
      <br />
      <button onClick={deleteAcountHandler} className={classes.button1} >delete my account</button>

        </div>
    </Fragment>
}

export default Profile


// style="margin: 24px 0;