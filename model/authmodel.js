const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
        username:{
    type:String,
    required:true["username is required"], unique: true
},
        email:{
    type:String,
    required:true["email is required"], unique: true
},
        password:{
    type:String,
    required:true["password is required"], unique: true
},
        token:{
    type: String

},
isAdmin:{
    type:Boolean,
    default:false
},
isSuperAdmin:{
    type:Boolean,
    default:false
}

})

const userModel = mongoose.model("user", userschema)
module.exports = userModel