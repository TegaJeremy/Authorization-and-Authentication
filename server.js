const express = require('express')
const PORT =1209
const userRouter = require("./router/userrouter")

const userDb = require('./db/userdb')
const app = express();
app.use (express.json());
app.use(userRouter)


 

app.listen(PORT, ()=>{
    console.log(`app has listed to ${PORT}`)
});

