const express = require('express');
const mariadb = require('mariadb')
const cors = require('cors')
const app = express()
const path = require('path')


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
// app.use((req,res)=>{
//     res.status(404)
//     // res.sendFile('public/index.html', {root: __dirname});
//     res.send(`<h1>site not found</h1>`)
// })

app.use(cors());
// app.use(cors({
//     origin: ['http://localhost:5500'],
//   }));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500/client/home.html");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });



const pool = mariadb.createPool({
    host:"localhost",
    user:"root",
    database:'backend',
    password:'camindo'

});

app.get('/users',async(req,res)=>{
    try {
        conn = await pool.getConnection()
        const result = await conn.query("select * from info")
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

app.get('/users/:id',async(req,res)=>{
    try {
        const id = req.params.id
        
        conn = await pool.getConnection()
        const result = await conn.query("select * from info where id=?",id)
      
    } catch (error) {
        res.send(error)
    } finally{
        conn.release()
    }
})

app.post('/users', async(req,res)=>{
    var {firstname,lastname,age} = req.body
    console.log(req.body)
    let conn;
    try {
        console.log(firstname,lastname,age)
        conn = await pool.getConnection()
        const result = await conn.query("insert into info (firstname, lastname,age) VALUES (?, ?, ?)",[firstname,lastname,age])
        res.json({
            "res":"your code is working denis"
        })

    } catch (error) {
        res.send(error)
    }
}
)

app.listen('3008',()=>{
    console.log('server is working')
    
})