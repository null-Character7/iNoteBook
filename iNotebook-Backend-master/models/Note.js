const mongoose=require("mongoose");

const NoteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Note=new mongoose.model('notes',NoteSchema);
// Note.createIndexes();//to maintain uniqueness

module.exports=Note;