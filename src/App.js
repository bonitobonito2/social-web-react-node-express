import { Fragment, useEffect,useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Axious from 'axios'
import Body from './registaredComponents/body';
import Login from './components/login/login';
import Registar from './components/registar/registar';
import {useSelector,useDispatch} from 'react-redux'
import { functionsFromStore } from './store/store';
function App() {
  const dispatch = useDispatch()
  const [layout,setLayout] = useState('login')
  const loginInfo = useSelector(state => state.isLoggined)
  console.log('aq kide ertxel shemovedi')
  const [isLoggined,setLoggined] = useState(localStorage.getItem('isLoggined'))
  useEffect(()=>{
    dispatch(functionsFromStore.startChangeLoginInfo(isLoggined))
  },[isLoggined])
  const logut =()=>{
  localStorage.setItem('isLoggined', 0)
  localStorage.setItem('ID', 0)

  setLoggined(localStorage.getItem('isLoggined'))

  }

  if(loginInfo== 0 || loginInfo == null){
    return (
      <Fragment>
       <NavBar layout = {setLayout} />
       {layout === 'login' && <Login isloggined = {setLoggined} />}
       {layout ==='registar' && <Registar />}
    
      </Fragment>
     );
  }
  else{
    return (
    <Body logut = {logut} />
    )
  }
}

export default App;





// useEffect(()=>{
//   const fetchData =()=>{
//     Axious.get('http://localhost:5000/').then(response =>{
//       console.log(response)
//     })
//   }
//   const sendData = ()=>{
//     fetch('http://localhost:5000/post-test', {
//         method: 'POST',
//         body : JSON.stringify({zaali : 'ki'}),
//         headers: {
//           'Content-Type': 'application/json'
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
        
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//   }
//   sendData()

// },[])