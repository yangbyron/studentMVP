const express = require('express');
const app = express();
const cors=require('cors');
const {Client}=require('pg');
const config = require('./config')[process.env.NODE_ENV || 'dev'];
const PORT = config.port;
const client = new Client({
    connectionString: config.connectionString
});
client.connect();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/api/list',(req,res)=>{
    client.query('SELECT * FROM to_do_list ORDER BY added_date ASC;')
    .then((data)=>{
        res.send(data.rows);
    })
})

app.post('/api/list',(req,res)=>{
    let description = req.body.description;
    console.log('Inserting description:',description);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    client.query(`INSERT INTO to_do_list (description, added_date) values ('${description}','${today}');`)
    .then(()=>{
        console.log('insert succeed!');
        res.end();
    })
})

app.delete('/api/list/:id',(req,res)=>{
    let id=req.params.id;
    console.log('Deleting id:',id);
    client.query('DELETE from to_do_list WHERE id = $1;',[id])
    .then(()=>{
        console.log('delete succeed!');
        res.end();
    })
})

app.patch('/api/list/:id',(req,res)=>{
    console.log('Updating...');
    let id=req.params.id;
    let description = req.body.description;
    client.query(`UPDATE to_do_list SET description = '${description}' WHERE id = $1;`,[id])
    .then(()=>{
        console.log('update succeed!');
        res.end();
    })
})

app.listen(PORT,()=>{
    console.log('Backend server is listening on port', PORT);
})