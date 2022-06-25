import React,{useState} from "react";
import Classes from './NavBarLogined.module.css'
import { functionsFromStore } from "../../store/store";
import {useSelector,useDispatch} from 'react-redux'

import axios from "axios";
const NavBarLogined = (props)=>{
    const dispatch = useDispatch()
    const [actived,setActived] = useState('profile')
    const logged = useSelector(state=>state.isLoggined)
    const picurl = useSelector(state=>state.person)
   
    console.log(picurl)
    console.log(logged)
    const navLogoutHandler = ()=> {
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
    }
   
    const navProfileHandler = ()=> {
        props.layout('profile')
        setActived('profile')
    }


    const navPeopleHandler = () => {
        console.log('shemovedi')
        props.layout('people')
        setActived('people')
    }
    
    const friendsHandler = ()=>{
        props.setActivatedFriends(state => !state)
    }
   
    return<div className={Classes.navBar}>
      <img onClick={navProfileHandler} className={Classes.img} src = {picurl.potourl}/>
    <li onClick={navLogoutHandler} className={Classes.logout}><img alt="log out" src="https://www.seekpng.com/png/full/41-413813_shutdown-button-clipart-arrow-icon-logout-white-png.png" /></li>
   
    <li><a id="friends" onClick = {friendsHandler} class = {props.activatedFriends && Classes.active}  href="#">friends</a></li>
    <li><a onClick = {navPeopleHandler} class = {actived === 'people' && Classes.active}  href="#">people</a></li>
 
   

    {/* <li><a onClick={navRegistarHandler} class = {actived ==='upload' && Classes.active} href="#">uoload</a></li>
    <li><a onClick={navRegistarHandler} class = {actived ==='people' && Classes.active} href="#">people</a></li> */}
   
    </div>
}


export default NavBarLogined