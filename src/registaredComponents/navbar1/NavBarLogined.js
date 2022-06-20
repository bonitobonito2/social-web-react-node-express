import React,{useState} from "react";
import Classes from './NavBarLogined.module.css'
import { functionsFromStore } from "../../store/store";
import {useSelector,useDispatch} from 'react-redux'

const NavBarLogined = (props)=>{
    const dispatch = useDispatch()
    const [actived,setActived] = useState('login')
    const logged = useSelector(state=>state.isLoggined)
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
            password : ''
        }))
    }
   
    const navProfileHandler = ()=> {
        props.layout('profile')
        setActived('profile')
    }
    return<div className={Classes.navBar}>
    
    <li><a  onClick={navLogoutHandler} class = {actived ==='logout' && Classes.active} href="#">logout</a></li>
    <li><a onClick={navProfileHandler} class = {actived ==='profile' && Classes.active} href="#">profile</a></li>
    {/* <li><a onClick={navRegistarHandler} class = {actived ==='upload' && Classes.active} href="#">uoload</a></li>
    <li><a onClick={navRegistarHandler} class = {actived ==='people' && Classes.active} href="#">people</a></li> */}
   
    </div>
}


export default NavBarLogined