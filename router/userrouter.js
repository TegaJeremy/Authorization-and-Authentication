const express = require('express')

const {newUser, userLogin, getone, updateAdmin, getall, updateUser, deleteUser} = require('../controller/userController')
const checkUser = require('../controller/authorizotion')
const router = express.Router()
router.route("/").get((req,res)=>{
    res.json("welcome to my authentication api homepage")
})

router.route("/signup").post(newUser)
router.route("/signin").post(userLogin)
router.route("/:id/getone/:userid").get(checkUser,getone)
router.route("/:id/getall").get(checkUser,getall)
router.route("/updateAdmin/:id").put(updateAdmin)
router.route("/:id/update/:userid").put(checkUser,updateUser)
router.route("/:id/delete/:userid").delete(checkUser,deleteUser)


module.exports = router
