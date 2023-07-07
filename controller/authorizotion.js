const jwt = require('jsonwebtoken')
const userModel = require ('../model/authmodel')


const authentication =  async (req,res,next)=>{
   try {
    const user = await userModel.findById(req.params.id)
    const usertoken = user.token
    if(!usertoken){
        res.status(400).json("token not find")
    }
    await jwt.verify(usertoken,process.env.secretKey, (err,payload)=>{
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
        if(user.isAdmin){
            next()
        } else(
            res.json("you are not authorise to perform this action")
        )
    })
}

module.exports = checkUser