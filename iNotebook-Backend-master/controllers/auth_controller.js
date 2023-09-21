const User=require("./../models/User");
const { validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const JWT_SECRET=process.env.JWT_SECRET;


module.exports.createUser=async function(req,res){
    // res.writeHeader("nicename","BSDK");
    try{
    	let success=false;
        // console.log("body:",req.body);
        const err= validationResult(req);
        //if there are errors, return bad request and errors
        if (!err.isEmpty()) {
            // return res.send(`Hello, ${req.query.person}!`);
            return res.status(400).json({success,errors:err.array()});
        }

        //check whether a user with the given email exits or not.
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,error: "Sorry a user with the email already exists"});
        }
        //for hashing the password
        const salt=await bcrypt.genSalt(10);
        // console.log("salt:",salt);
        const secPass=await bcrypt.hash(req.body.password,salt);
        //create user
        user=new User({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        });
        await user.save();
        const data={
            user:{
                id:user.id
            }
        };
        let authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        return res.status(200).json({success,authtoken});
        // return res.status(200).json(user);
        // return res.status(200).json({message:"The user is created successfully"});
    }
    catch(err){
        // console.log("Error on creating a user",err);
        return res.body(500).json({
            success:false,
            message:"Error on creating a user",
            error:err
        })
    }
};



module.exports.login=async function(req,res){
    // res.writeHeader("nicename","BSDK");
    try{
	let success=false;
        const {email,password}=req.body;
        // console.log("body:",req.body);
        const err= validationResult(req);
        //if there are errors, return bad request and errors
        if (!err.isEmpty()) {
            // return res.send(`Hello, ${req.query.person}!`);
            return res.status(400).json({success,errors:err.array()});
        }

        //check whether a user with the given email exits or not.
        let user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({success,error: "Please try to log in using correct credentials"});
        }
        //compare password
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success,error: "Please try to log in using correct credentials"});
        }

        const data={
            user:{
                id:user.id
            }
        };
        let authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        return res.status(200).json({success,authtoken});
    }
    catch(err){
        // console.log("Error on creating a user",err);
        return res.body(500).json({
            success:false,
            message:"Error while authenticating a user",
            error:err
        })
    }
};


module.exports.getuser=async function(req,res){
    try{
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        // const user=await User.findById(userId).project({password:0});
        return res.status(200).json(user);
    }
    catch(err){
        console.error(err.message);
        return res.status(500).json({error:"Internal server error"});
    }
};
