const user = require ('../model/authmodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')






const newUser = async (req, res)=>{
   try {
    const  {username, email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword  = bcrypt.hashSync(password, salt)
    const data = {
        username, 
        email,
        password:hashedPassword
    }
    const createUser = await user.create(data)
    const token = jwt.sign(
        {
            id:user._id,
            password:user.password
        },
        process.env.secretKey,
        {expiresIn:"1d"}
    )
    createUser.token=token
    createUser.save()
    res.status(200).json({message:"user have been created ", data:createUser})
    
   } catch (error) {
    res.status(500).json(error.message)
   }

}

// const userLogin = async (req, res)=>{
//     try {
//         const {username, password} = req.body

//         const checkUsername = await user.find({username})
//         const checkPassword = bcrypt.compareSync(password, checkUsername.password);
//         if(!checkUsername){
//             res.status(404).json({message:"username not found"})
//         } 
//         // const checkPassword = bcrypt.compareSync(password, checkUsername.password);
//         if(!checkPassword){
//            return  res.status(404).json({message:"invalid person"})
//             // const token = jwt.sign(
//             //     {
//             //         id:checkUsername._id,
//             //         password:checkUsername.password
//             //     },
//             //     process.env.secretKey,
//             //     {expiresIn:"1d"}
//             // )
//             // createUser.token=token
//             // createUser.save()
//         } else{
//            return res.status(200).json({data: checkUsername})
//         }
        
//     } catch (error) {
//        return  res.status(500).json(error.message)
//     }
// }
const userLogin = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const checkUsername = await user.findOne({ $or:[{username}, {email}] });
       
        if (!checkUsername) {
            return res.status(404).json({ message: "username not found" });
        }

        const checkPassword = bcrypt.compareSync(password, checkUsername.password);
        if (!checkPassword) {
            const token = jwt.sign(
                {
                    id: checkUsername._id,
                    password: checkUsername.password,
                   
                },
                process.env.secretKey,
                { expiresIn: "1d" }
            );
            checkUsername.token = token
            checkUsername.save()
            

            return res.status(404).json({ message: "invalid person" });
        } else {
            return res.status(200).json({message:"successful", data:[checkUsername.username, checkUsername.email]});
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getall = async (req,res)=>{
 try {
    const getall = await user.find()
    if (!getone) {
        res.status(404).json("error getting data")
    } else {
         res.status(200).json({data:getall})
    }
    
 } catch (error) {
    res.status(500).json(error.message)
 }

}


   const getone = async (req,res)=>{
 try {
    const getone = await user.findById(req.params.userid)
    if (!getone) {
        res.status(404).json("error getting data")
    } else {
         res.status(200).json({data:getone})
    }
    
 } catch (error) {
    res.status(500).json(error.message)
 }

}

const updateAdmin = async (req,res)=>{
    try {
        const id = req.params.id
        const change = await user.findByIdAndUpdate(id, {isAdmin:true})
        if (true) {
             res.status(200).json({data:change})
        } else {
            res.json("error")
        }
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateUser=async(req,res)=>{
    try {
      
      const userid=req.params.userid
      const Duser=await user.findByIdAndUpdate(req.params.id,req.body,{new:true})
      if(!Duser){res.json("unable to update user")}
      else{res.json({message:"user update sucessfully",data:Duser})}
  
  
  
      
    } catch (error) {
      res.json(error.message)
    }
  
}

const deleteUser = async (req,res)=>{
    try {
        const userid=req.params.userid
        const Duser=await user.findByIdAndDelete(req.params.id,req.body,{new:true})
        if(!Duser){res.json("unable to delete user")}
        else{res.json({message:"delete successfully sucessfully",})}
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
  newUser,
  userLogin,
  getone,
  getall,
  updateAdmin,
  updateUser,
  deleteUser
}