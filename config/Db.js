// Fpv30lW1HbnpJPqE
// mongodb+srv://oghenedemartin:Fpv30lW1HbnpJPqE>@cluster0.htfq2ca.mongodb.net/
require ('dotenv').config()
const mongoose = require ('mongoose')


mongoose.connect(process.env.url).then(()=>{
    console.log('connected to database successfully')
}).catch((error)=>{
    console.log(error.message)
})