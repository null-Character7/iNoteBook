const mongoose=require("mongoose");

// mongo-url for local: 'mongodb://127.0.0.1:27017/inotebook'

// const temp={
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false
// };

mongoose.connect(process.env.MONGO_ATLAS_URL)
.then(()=>{
    console.log("Successfully connected to database");
})
.catch((err)=>{
    console.log("Error while connection to database",err);
})

const db=mongoose.connection;
module.exports=db;