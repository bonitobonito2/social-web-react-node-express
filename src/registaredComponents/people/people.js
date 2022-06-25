
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import loadingClasses from '../../loading/loading.module.css'
import classes from './people.module.css'
import { useSelector } from "react-redux"
import Card from "./card"
const People = (props) =>{
const [people,setPeople] = useState([])
const [loading,setLoading]  = useState(false)
const inputInformation = useRef()
const userGmail = useSelector(state => state.person.email)

const submitHandler =(event)=>{
    event.preventDefault()
    setLoading(true)
    const information = inputInformation.current.value
    let name = ''
    let lastname = ''
    let couunter = 0
    for(var i =0 ; i < information.length; i++){
        if(information[i] != ' ' && couunter ==0){
            name +=information[i]
        }
        else if(information[i] != ' ' && couunter == 1){
            lastname  +=information[i]
        }
        else if(information[i] == ' '){
            couunter ++ 
        }

        if(couunter == 2){
            break
        }
       
    }
    axios.post('http://localhost:5000/getallpeoplebyinfo',{name : name, lastname : lastname})
    .then(response=>{
        console.log(response)
        let people1 = response.data
        let arr = []
        for(let i = 0; i < people1.length; i++){
          
            if(userGmail != people1[i].email){
                arr.push(people1[i])
            }
        }
        setPeople(arr)
        setLoading(false)
    })
}
useEffect(()=>{
    setLoading(true)
    const getPeople = ()=>{
        axios.get('http://localhost:5000/people')
        .then(response=>{
            let people1 = response.data
            let arr = []
            for(let i = 0; i < people1.length; i++){
              
                if(userGmail != people1[i].email){
                    arr.push(people1[i])
                }
            }
            setPeople(arr)
            setLoading(false)
        })
    }
    
    getPeople()
},[])
    
   
    if(loading == true){
        return <div className={classes.loading}>
             {loading && <div className={loadingClasses['lds-dual-ring']}></div>}
        </div>
    }
    return <div>
        <form onSubmit={submitHandler}>
            <div className={classes.search}>
            <div>
                   <img onClick={submitHandler} src='https://icon-library.com/images/search-icon-white/search-icon-white-16.jpg'/>
            </div>
            <div>
                <input ref={inputInformation}  type='saerch' placeholder="search people"/>
                </div>
            </div>
        </form>
       
       
  
       {people.map(state=>
 <Card
 key = {props.id}
  layout = {props.layout}
  firstname = {state.firstname}
        lastname = {state.lastname}
        email = {state.email}
        nickname = {state.nickname}
        potourl = {state.potorul} />
      )}
    </div>
    }

export default People
