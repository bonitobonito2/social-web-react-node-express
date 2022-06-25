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
       const email = req.body.email
       const password = req.body.password
       con.query(`select * from registaredUsers WHERE email = "${email.trim()}" && password = "${password.trim()}" `,(err,result,fields)=>{
        if(err) throw err
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
        let newemail = ''
        for(var i = 0; i < email.length; i++){
          if(email[i] !== '.' & email[i] !== '@'){
            newemail+= email[i]
          }
        }
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


const emailTransform = (email) =>{
  let myEmailForTable = ''
  for(var i = 0; i < email.length; i++){
      if(email[i] != '.' && email[i] != '@'){
          myEmailForTable += email[i]
      }
  }
  return myEmailForTable
}


app.post('/deleteaccount',(req,res)=>{
  const email = req.body.email
  console.log('shemovedi')
  const tableEmail = emailTransform(email)
  con.query(`select email from registaredusers where id != ${req.body.id} `,(err,result)=>{
    if(err){
    }
    // delete friends
    for (var i = 0; i < result.length; i++){
      let em = (emailTransform(result[i]['email']))
      con.query(`delete from ${em}friends WHERE email = "${email}"`,(err,result)=>{
        if(err) throw err
      })
    }
    // delete chat
    con.query(`select email from registaredusers where id != ${req.body.id}`,(err,result)=>{
      if(err) console.log(chat)
      for(var i = 0; i < result.length; i++){
        const email2  = emailTransform(result[i].email)
        const tableName1 =  tableEmail+'to'+email2+'chat'
        const tableName2 =  email2+'to'+tableEmail+'chat'
        con.query(`SHOW TABLES LIKE '${tableName1}'`,(req,result)=>{
  
          console.log(result+'xd')
          if(result.length == 0){
            console.log('nah')
          }
          if(result.length != 0){
            con.query(`drop table ${tableName1}`,(err,result)=>{
              con.query(`drop table ${tableName2}`,(err,result)=>{
                console.log(tableName1,tableName2+'wasishala')
              })
            })
          }
        })
     
      }
     
  })


    con.query(`drop table ${tableEmail}friends`,(err,result)=>{
      con.query(`DELETE FROM registaredusers WHERE ID =${req.body.id} `,(err,result)=>{
        if(err) console.log(err)
        res.send('yep')
      })
    })
   
  })


  

 
 
})

app.post('/getPersonByEmail',(req,res)=>{

  const email = req.body.email
  con.query(`SELECT * FROM registaredusers WHERE email = '${email}'`,(err,result)=>{
    if(err) throw err
    res.send(result)
  })
})

app.post('/addfriend',(req,res)=>{
 
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
 
  con.query(`DELETE from ${req.body.emailForTable1} WHERE email = '${req.body.info2.email}'`,(err,result)=>{
    if(err) console.log(err)
   
    con.query(`DELETE from ${req.body.emailForTable2} WHERE email = '${req.body.info1.email}'`,(err,result)=>{
      if(err) console.log(err)
       
        res.send('waishala congs')
    })
  })
})

app.post('/getallfriend',(req,res)=>{
 
  con.query(`SELECT * from ${req.body.tableName}friends`,(err,result)=>{
    console.log(result+'xddd')
    res.send(result)
  })
})

app.post('/getallfriendbyname',(req,res)=>{
 
  con.query(`SELECT * from ${req.body.tableName}friends where name LIKE '%${req.body.name}%' && lastname LIKE "%${req.body.lastname}%"`,(err,result)=>{
    if(err){
      console.log(err)
    }
      if(result.length == 0){
        con.query(`SELECT * from ${req.body.tableName}friends where name LIKE '%${req.body.name}%'`,(err,result)=>{
        
          if(result.length == 0){
           
            con.query(`SELECT * from ${req.body.tableName}friends where lastname LIKE '%${req.body.name}%'`,(err,result)=>{
             
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


app.post('/getallpeoplebyinfo',(req,res)=>{
  console.log(req.body.name)
  con.query(`SELECT * from registaredusers where firstname LIKE '%${req.body.name}%' && lastname LIKE "%${req.body.lastname}%"`,(err,result)=>{
    if(err){
      console.log(err)
    }
   
      if(result.length == 0){
        con.query(`SELECT * from registaredusers where firstname LIKE '%${req.body.name}%'`,(err,result)=>{
          console.log('alo')
          console.log(result)
          if(result.length == 0){
            console.log(result)
            con.query(`SELECT * from registaredusers where lastname LIKE '%${req.body.name}%'`,(err,result)=>{
             
              res.send(result)
            })
          }else{
            console.log(result)
            res.send(result)
          }
        })
      }else{
        res.send(result)
      }
  })
})

app.post('/existtable',(req,res)=>{
  const sentTotr = emailTransform(req.body.senterEmail)
  const reciver = emailTransform(req.body.reciverEmail)
  const tableName1 = sentTotr+'TO'+reciver+'Chat'
  const tableName2 = reciver+'TO'+sentTotr+'Chat'
  con.query(`SHOW TABLES LIKE '${tableName1}'`,(err,result)=>{
    if(result.length == 0){
      con.query(`SHOW TABLES LIKE '${tableName2}'`,(err,result)=>{
      if(result.length ==0){
        con.query(`CREATE TABLE ${tableName1} (mysms VARCHAR(255), recivedsms VARCHAR(255))`,(err,result)=>{
          if(err) throw err
          con.query(`CREATE TABLE ${tableName2} (mysms VARCHAR(255), recivedsms VARCHAR(255))`,(err,result)=>{
            if(err) throw err
                res.send('tables created')
          })
        })
      }
    
    })
    }else{
      res.send('tables already exists')
    }
  })

})

app.post('/sendsms',(req,res)=>{
  console.log(req.body)
  const senterEmail = emailTransform(req.body.senderEmail)
  const reciverEmail = emailTransform(req.body.reciverEmail)
  const sms = emailTransform(req.body.sms)
  const table1Name = senterEmail + 'TO' + reciverEmail+'Chat'
  const table2Name = reciverEmail + 'to' + senterEmail + 'Chat'
  con.query(`insert into ${table1Name} (mysms,recivedsms) VALUES('${sms}','${null}')`,(err,result)=>{
    if(err) console.log(err)
    console.log(result)
    con.query(`insert into ${table2Name} (mysms,recivedsms) VALUES('${null}','${sms}')`,(err,result)=>{
      if(err) console.log(err)
      console.log(result)
      res.send('sent')
    })
  })
})

app.post('/getchat',(req,res)=>{
  console.log(req.body)
  const senterEmail = emailTransform(req.body.senderEmail)
  const reciverEmail = emailTransform(req.body.reciverEmail)
  const table1Name = senterEmail + 'TO' + reciverEmail+'Chat'
  con.query(`select * from ${table1Name}`,(err,result)=>{
    if(err) console.log(err)
    res.send(result)
  })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)


  })

