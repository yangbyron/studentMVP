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
app.get('/api/list',(req,res)=>{
    client.query('SELECT * FROM to_do_list;')
    .then((data)=>{
        console.log(data.rows);
        res.send(data.rows);
    })
})
app.listen(PORT,()=>{
    console.log('Listening on port', PORT);
})