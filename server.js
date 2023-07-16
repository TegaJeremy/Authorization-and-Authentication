const express = require('express');

const mongoose = require('mongoose')
const  PORT = 5554;

const userRouter = require("./router/userrouter")
const recordRouter = require('./router/recordRouter' );
const userDb = require('./config/Dbconfig')
const app = express();
app.use (express.json());
app.use( '/api', userRouter );
app.use( '/api', recordRouter );




app.listen(PORT, ()=>{
    console.log(`app has listed to ${PORT}`)
});



