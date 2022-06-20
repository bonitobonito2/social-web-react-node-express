
const cors=require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const port =  5000
const app = express();
const mysql = require('mysql')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zaalizaali2",
  database : 'socialweb'
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});





app.post('/login', (req, res) => {
    console.log('Got body:', req.body);
       const email = req.body.email
       const password = req.body.password
       con.query(`select * from registaredUsers WHERE email = "${email.trim()}" && password = "${password.trim()}" `,(err,result,fields)=>{
        if(err) throw err
        console.log(result)
        if(result.length == 0){
          res.send('failed registration')
        }
        else{
          res.send(result)
        }
      })
});


app.get('/', (req, res) => {
    res.message = {
        sms : 'hey'
    }
    res.send(res.message.sms)
  })


app.post('/registration',(req,res) =>{
  const {name,lastname,nickname,email,password} = req.body
  if(name.length == 0 || lastname.length ==0 || nickname.length == 0 || email.length ==0 || password.length == 0){
    res.send('fill inputs')
    return
  }
  con.query(`select * from registaredUsers WHERE email = "${req.body.email}"`,(err,result,fields)=>{
    console.log(result)
    if(result.length == 0){
      con.query(`INSERT INTO registaredusers (firstname,lastname,nickname,email,password) VALUES ('${name}','${lastname}','${nickname}', '${email}', '${password}')`,(err,result)=>{
        if(err){
          res.send('err')
          throw err
        } 
        console.log(result)
        console.log('inserted')
        res.send('succses')
      })
    }else{
      res.send('email is already in usage')
    }
  })
 
})

app.post('/byId',(req,res)=>{
  console.log(req.body)
  con.query(`SELECT * FROM registaredusers WHERE ID = '${req.body.id}'`,(err,result)=>{
    if(err){
      res.send('err')
    }
    res.send(result)  
  })
 
})
app.post('/update',(req,res) =>{
  console.log('shemovedi')
   const firstname = req.body.firstname
   const lastname = req.body.lastname
   const nickname = req.body.nickname
   const email = req.body.email
   console.log(email)
  
   console.log(email)
   console.log(req.body)
   
   con.query(`UPDATE registaredusers SET firstname = '${firstname}', lastname = '${lastname}', nickname = '${nickname}' WHERE email = '${email}'  `,(err,result)=>{
    if(err){
      console.log('err')
      res.send(err)
      throw err
    }
    console.log('akvar')
    console.log(result)
    res.send('eyo')
   })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

