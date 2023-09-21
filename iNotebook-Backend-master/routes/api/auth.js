const express=require("express");
const router=express.Router();
const authController=require("./../../controllers/auth_controller");
const { body } = require('express-validator');
const fetchuser=require("./../../middleware/fetchuser");



//Create a user using: POST:"/api/auth/createuser". No login required
router.post("/createuser",[
    body("email","enter a valid email").isEmail(),
    body("name","enter a valid name").isLength({min:3}),
    body("password","enter a valid password").isLength({min:5}),
],authController.createUser);


//login a user using credentials: POST:"/api/auth/login" ... No login reqired
router.post("/login",[
    body("email","enter a valid email").isEmail()
],authController.login);


//get logged in user details : GET:"/api/auth/getuser"... login required
router.get("/getuser",fetchuser,authController.getuser);


module.exports=router;