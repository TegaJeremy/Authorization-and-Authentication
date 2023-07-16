const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')




const authentication =  async (req,res,next)=>{
   try {
    const user = await userModel.findById(req.params.id)
if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
    // console.log(user)
    const usertoken = user.token
    if(!usertoken){
        res.status(400).json("token not find")
    }
    await jwt.verify(usertoken, process.env.JWT_SECRETE, (err,payload)=>{
        if(err){
            res.json(err.message)
        } else{
            req.user = payload
            next()
        }

    })
    
   } catch (error) {
    res.json(error.message)
   }
}

const checkUser = (req,res,next,)=>{
    authentication(req,res, async ()=>{
        const user =  await userModel.findById(req.params.id)
        if(user.isVerified){
            next()
        } else(
            res.json("you are not authorise to perform this action")
        )
    })
}

module.exports = checkUser