
import axios from "axios"
import { useEffect, useState } from "react"
import loadingClasses from '../../loading/loading.module.css'
import classes from './people.module.css'
import { useSelector } from "react-redux"
import Card from "./card"
const People = () =>{
const [people,setPeople] = useState([])
const [loading,setLoading]  = useState(false)
const userGmail = useSelector(state => state.person.email)
useEffect(()=>{
    setLoading(true)
    const getPeople = ()=>{
        axios.get('http://localhost:5000/people')
        .then(response=>{
            let people1 = response.data
            console.log(people1)
            let arr = []
            for(let i = 0; i < people1.length; i++){
              
                if(userGmail != people1[i].email){
                    arr.push(people1[i])
                }
            }
            setPeople(arr)
            console.log(people)
            setLoading(false)
         
          
        })
    }
    
    getPeople()
},[])
    console.log(people)
   
    if(loading == true){
        return <div className={classes.loading}>
             {loading && <div className={loadingClasses['lds-dual-ring']}></div>}
        </div>
    }
    return <div>
       {people.map(state=>
 <Card
  
  firstname = {state.firstname}
        lastname = {state.lastname}
        email = {state.email}
        nickname = {state.nickname}
        potourl = {state.potorul} />
      )}
    </div>
    }

export default People
