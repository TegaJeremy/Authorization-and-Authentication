const express = require('express')

const {newUser, userLogin, getone, updateAdmin,updateSuperAdmin, getall, updateUser, deleteUser} = require('../controller/userController')
const {checkUser,checkSuperUser} = require('../controller/authorizotion')
const router = express.Router()
router.route("/").get((req,res)=>{
    res.json("welcome to my authentication api homepage")
})

router.route("/signup").post(newUser)
router.route("/signin").post(userLogin)
router.route("/getone/").get(getone)
router.route("/:id/getall").get(getall)
router.route("/:id/update/:userid").put(updateUser)
router.route("/:id/delete/:userid").delete(checkUser,deleteUser)


//update admins
router.route("/updateAdmin/:id").put(updateAdmin)
router.route("/updateAdmin/:id").put(updateSuperAdmin)


module.exports = router
