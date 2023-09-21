const jwt=require("jsonwebtoken");

const JWT_SECRET=process.env.JWT_SECRET;

module.exports=async function fetchuser(req,res,next){
    //get userr from the auth token and add id to the res object
    const token=req.header("auth-token");
    if(!token){
        return res.status(401).json({error:"Please authenticate user using valid token"});
    }
    try{
        //it returns the payload
        const data=jwt.verify(token,JWT_SECRET);
        // console.log(data);
        req.user=data.user;
        next();
    }
    catch(err){
        return res.status(401).json({error:"Please authenticate user using valid token"});
    }
};


