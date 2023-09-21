const dotenv=require("dotenv");
dotenv.config();
const db=require("./config/mongoose");
const express=require("express");
const cors=require("cors");

const port=process.env.PORT || 8000;

const app=express();

app.use(cors());

// app.use(cors());

app.use(express.json());

app.use("/",require("./routes"));
// console.log(process.env.MESSAGE);

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting to the server\n${err}`);
    }
    else{
        console.log(`Server is running on `);
    }
});
