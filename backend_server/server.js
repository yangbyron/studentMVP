const express = require('express');
const app = express();
const cors=require('cors');
const {Client}=require('pg');
const config = require('./config.json')[process.env.NODE_ENV || 'dev'];
const PORT = 3000;
const client = new Client({
    connectionString: config.connectionstring
});
client.connect();
app.use(cors());
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.send('hello world');
})

app.get('/api/list',(req,res)=>{
    client.query('SELECT * FROM to_do_list;')
    .then((data)=>{
        res.send(data.rows);
    })
})
app.listen(PORT,()=>{
    console.log('Backend server is listening on port', PORT);
})