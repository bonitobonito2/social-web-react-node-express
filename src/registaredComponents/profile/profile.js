import React, { Fragment, useEffect, useState } from "react";
import classes from './profile.module.css'

import { functionsFromStore } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import loadingClasses from '../../loading/loading.module.css'
import axios from "axios";
import Change from "../cards/change";
const Profile = ()=>{
    const dispatch = useDispatch()
    const [isLoading,setLoading] = useState(false)
    const [change,setChange] = useState(false)
    
    useEffect(()=>{
        setLoading(true)
        axios.post('http://localhost:5000/byId',{id : localStorage.getItem('ID')})
        .then(response =>{
            const takeInformation = response.data[0]
            console.log(takeInformation)
            dispatch(functionsFromStore.changeUserInformationPlus(response.data[0]))
            setLoading(false)
        })
    
    },[change])

    const information = useSelector(state => state.person)
      
    
    if(isLoading){
    return<div className={classes.card}>
    <div className={loadingClasses['lds-dual-ring']}></div>
    </div> 
    }
    return <Fragment>
        {change && <Change change = {setChange} />}
        <div  className={classes.card}>
     <center>
     <h2>{information['firstname']} {information['lastname']}</h2>
     </center>
     <br/>
      
        <p>nickname : {information['nickname']}</p>
        <br/>
        <p> email : {information['email']}</p>
        
      
      <br/>
      <button onClick={()=>setChange(!change)} className={classes.button} >change my information</button>
        </div>
    </Fragment>
}

export default Profile


// style="margin: 24px 0;