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
    
    return<div className={Classes.navBar}>
    
    <li><a  onClick={navLogoutHandler} class = {actived ==='logout' && Classes.active} href="#">logout</a></li>
    <li><a onClick={navProfileHandler} class = {actived ==='profile' && Classes.active} href="#">profile</a></li>
    <li><a onClick = {navPeopleHandler} class = {actived === 'people' && Classes.active}  href="#">people</a></li>
    <img className={Classes.img} src = {picurl.potourl}/>

    {/* <li><a onClick={navRegistarHandler} class = {actived ==='upload' && Classes.active} href="#">uoload</a></li>
    <li><a onClick={navRegistarHandler} class = {actived ==='people' && Classes.active} href="#">people</a></li> */}
   
    </div>
}


export default NavBarLogined