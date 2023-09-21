const express=require("express");
const router=express.Router();

router.get("/",function(req,res){
    return res.send("Hello world");
});

router.use("/api",require("./api"));

module.exports=router;
