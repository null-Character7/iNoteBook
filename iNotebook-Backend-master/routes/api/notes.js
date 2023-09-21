const express=require("express");
const router=express.Router();
const notesController=require("./../../controllers/notes_controller");
const fetchuser=require("./../../middleware/fetchuser");
const { body } = require('express-validator');

// route-"/api/notes/"
router.get("/",notesController.notes);


//get all notes using :GET-"/api/notes/fetchallnotes"... login required
router.get("/fetchallnotes",fetchuser,notesController.fetchallnotes);


//add note using :POST-"/api/notes/addnote"... login required
router.post("/addnote",fetchuser,[
    body("title","enter a valid name").isLength({min:3}),
    body("description","enter a valid password").isLength({min:5}),
],notesController.addnote);


//add note using :PUT-"/api/notes/updatenote/id"... login required
router.put("/updatenote/:id",fetchuser,notesController.updatenote);


//delete note using :DELETE-"/api/notes/deletenote/id"... login required
router.delete("/deletenote/:id",fetchuser,notesController.deletenote);

module.exports=router;