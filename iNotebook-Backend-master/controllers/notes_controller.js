const Note=require("./../models/Note");
const { validationResult } = require('express-validator');


module.exports.notes=function(req,res){
    return res.status(200).json({
        message:"notes controller called"
    })
};

module.exports.fetchallnotes=async function(req,res){
    try{
        const notes=await Note.find({user:req.user.id});
        return res.status(200).json({notes});
    }
    catch(err){
        // console.log("Error in fetching the notes:",err.message);
        return res.status(500).json({error:"Internal server error"});
    }
};


module.exports.addnote=async function(req,res){
    try{
        // console.log("body:",req.body);
        const err= validationResult(req);
        //if there are errors, return bad request and errors
        if (!err.isEmpty()) {
            // return res.send(`Hello, ${req.query.person}!`);
            return res.status(400).json({success:false,errors:err.array()});
        }
        const {title,description,tag}=req.body;
        const note=await Note({title,description,tag,user:req.user.id});
        await note.save();
        return res.status(200).json({success:true,note});
    }
    catch(err){
        // console.log("Error in adding the notes:",err.message);
        return res.status(500).json({success:false,error:"Internal server error"});
    }
};


module.exports.updatenote=async function(req,res){
    try{
        const {title,description,tag}=req.body;
        const newnote={};
        if(title){newnote.title=title}
        if(description){newnote.description=description}
        if(tag){newnote.tag=tag}
        //find the note and update
        let note=await Note.findById(req.params.id);
        //console.log(req.params.id);
        if(!note){
            return res.status(404).json({success:false,error:"Not found"});
        }
        //check whether the user is the author of the note or not
        if(note.user.toString()!==req.user.id){
            return res.status(401).json({success:false,error:"Not allowed"});
        }
        note =await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        return res.status(200).json({success:true,note,message:"Noted updated successfully"});
    }
    catch(err){
        // console.log("Error in updating the notes:",err.message);
        return res.status(500).json({success:false,error:"Internal server error"});
    }
};



module.exports.deletenote=async function(req,res){
    try{
        //find the note and delete
        let note=await Note.findById(req.params.id);
        // console.log(req.params.id);
        if(!note){
            return res.status(404).json({success:false,error:"Not found"});
        }
        //check whether the user is the author of the note or not
        if(note.user.toString()!==req.user.id){
            return res.status(401).json({success:false,error:"Not allowed"});
        }
        // note =await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        await Note.findByIdAndDelete(req.params.id);
        return res.status(200).json({success:true,message:"Note deleted successfully"});
    }
    catch(err){
        // console.log("Error in deleting the notes:",err.message);
        return res.status(500).json({success:false,error:"Internal server error"});
    }
};
