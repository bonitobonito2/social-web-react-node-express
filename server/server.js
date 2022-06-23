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
        if(result.length == 0) res.send('failed registration')
        else res.send(result)
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
    if(result.length == 0){
      const potourl = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='
      con.query(`INSERT INTO registaredusers (firstname,lastname,nickname,email,password,potorul) 
      VALUES (
        '${name}',
        '${lastname}',
        '${nickname}',
        '${email}',
        '${password}',
        '${potourl}')`,(err,result)=>{
        if(err){
          res.send('err')
          throw err
        } 
        console.log('user inserted')
        let newemail = ''
        for(var i = 0; i < email.length; i++){
          if(email[i] !== '.' & email[i] !== '@'){
            newemail+= email[i]
          }
        }
        console.log(newemail)
        con.query(`CREATE TABLE ${newemail}friends 
        (email VARCHAR(30),
         name VARCHAR(30),
         potourl LONGTEXT,
         lastname VARCHAR(20),
         nickname VARCHAR(25))`,(err,result)=>{
          if(err) throw err
          res.send('succses')
        })
      })
    }else{
      res.send('email is already in usage')
    }
  })
})

app.post('/byId',(req,res)=>{
  console.log(req.body)
  con.query(`SELECT * FROM registaredusers WHERE ID = '${req.body.id}'`,(err,result)=>{
    if(err)  res.send('err')
    res.send(result)
  })
 
})
app.post('/update',(req,res) =>{
   const firstname = req.body.firstname
   const lastname = req.body.lastname
   const nickname = req.body.nickname
   const email = req.body.email
   con.query(`UPDATE registaredusers SET
    firstname = '${firstname}',
    lastname = '${lastname}',
    nickname = '${nickname}'
    WHERE email = '${email}'  `,(err,result)=>{
    if(err){
      res.send(err)
      throw err
    }
    res.send('eyo')
   })
})

app.get('/people',(req,res)=>{
  con.query('SELECT * FROM registaredusers',(err,result)=>{
    res.send(result)
  })
})

app.post('/updateImage',(req,res)=>{
  con.query(`UPDATE registaredusers SET potorul= "${req.body.url}" WHERE ID = "${req.body.id}" `,(err,result)=>{
    if(err) throw err
    res.send('egaris')
  })
})

app.post('/deleteaccount',(req,res)=>{
  console.log(req.body)
  con.query(`DELETE FROM registaredusers WHERE ID =${req.body.id} `,(err,result)=>{
    if(err) throw err
    res.send('yep')
  })
})

app.post('/getPersonByEmail',(req,res)=>{
  console.log(req.body)
  const email = req.body.email
  con.query(`SELECT * FROM registaredusers WHERE email = '${email}'`,(err,result)=>{
    if(err) throw err
    res.send(result)
  })
})

app.post('/addfriend',(req,res)=>{
  console.log(req.body)
   con.query(`insert into ${req.body.emailForTable1} (email,name,potourl,lastname,nickname)
      VALUES(
      '${req.body.info2.email}',
      '${req.body.info2.firstname}',
      '${req.body.info2.potorul}',
      '${req.body.info2.lastname}',
      '${req.body.info2.nickname}')`,(err,result)=>{
        if(err) console.log(err)
      con.query(`insert into ${req.body.emailForTable2} (email,name,potourl,lastname,nickname)
         VALUES(
          '${req.body.info1.email}',
          '${req.body.info1.firstname}',
          '${req.body.info1.potourl}',
          '${req.body.info1.lastname}',
          '${req.body.info1.nickname}')`,(err,result)=>{
            if (err) console.log(err)
            res.send('inserted')
   })
  })
})

app.post('/isfriend',(req,res)=>{
  con.query(`SELECT * from ${req.body.tableName}friends where email = '${req.body.email}'`,(err,result)=>{
    if(err) console.log(err)
    if(result.length == 0) res.send('not friends')
    else  res.send('friends')
  })
})

app.post('/removeFriend',(req,res)=>{
  console.log(req.body)
  con.query(`DELETE from ${req.body.emailForTable1} WHERE email = '${req.body.info2.email}'`,(err,result)=>{
    if(err) console.log(err)
    console.log(result)
    con.query(`DELETE from ${req.body.emailForTable2} WHERE email = '${req.body.info1.email}'`,(err,result)=>{
      if(err) console.log(err)
        console.log(result)
        res.send('waishala congs')
    })
  })
})

app.post('/getallfriend',(req,res)=>{
  console.log(req.body.tableName)
  con.query(`SELECT * from ${req.body.tableName}friends`,(err,result)=>{
    console.log(result+'xddd')
    res.send(result)
  })
})

app.post('/getallfriendbyname',(req,res)=>{
  console.log(req.body)
  con.query(`SELECT * from ${req.body.tableName}friends where name LIKE '%${req.body.name}%' && lastname LIKE "%${req.body.lastname}%"`,(err,result)=>{
    if(err){
      console.log(err)
    }
      if(result.length == 0){
        con.query(`SELECT * from ${req.body.tableName}friends where name LIKE '%${req.body.name}%'`,(err,result)=>{
          console.log('nulia')
          if(result.length == 0){
            console.log('nulia2')
            con.query(`SELECT * from ${req.body.tableName}friends where lastname LIKE '%${req.body.name}%'`,(err,result)=>{
              console.log(req.body.lastname) 
              res.send(result)
            })
          }else{
            res.send(result)
          }
        })
      }else{
        res.send(result)
      }
  })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)


  })

