import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState=function(props){
    // const host=process.env.REACT_APP_BACKEND_URL;
    // const host="http://localhost:8000";
    const host="https://inotebookbackend-a8d5.onrender.com";


    const [notes,setNotes]=useState([]);
    const [name,setName]=useState("");

    //fectch all note
    const getNotes=async function(){
        //TODO API CALL
        let url=`${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('inotebook_token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            // body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
          });
          // console.log("fetch complete");
          // console.log(response);
          const json= await response.json(); // parses JSON response into native JavaScript objects
          // console.log(json);
          setNotes(json.notes);
    };


    const fetchUserData=async function(){
      let url = `${host}/api/auth/getuser`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('inotebook_token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
        // body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      // console.log("fetch complete");
      // console.log(response);
      const json = await response.json();
      // console.log(json);
      setName(json.name);
    }


    //Add a note
    const addNote=async function(title,description,tag){
        //TODO API CALL
        let url=`${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('inotebook_token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
          });
          const json=await response.json(); // parses JSON response into native JavaScript objects
          if(json.success){
            setNotes(notes.concat(json.note));
            setTimeout(() => {
              alert("Note added successfully");
            }, 500);
          }
          else{
            alert("Some error occurs, note not added")
          }
    };


    //Delete a note
    const deleteNote=async function(id){
        //TODO API CALL
        let a=window.confirm("Are you sure that you want to delete the note?");
        if(a){
          let url=`${host}/api/notes/deletenote/${id}`;
          const response = await fetch(url, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('inotebook_token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
            });
            const json= await response.json(); // parses JSON response into native JavaScript objects
            // console.log(json);
          //function for client
          // console.log("Deleting note with id ",id);
          // setNotes(notes.filter((note)=>{return note._id!=id}));
          if(json.success){
            getNotes();
            setTimeout(() => {
              alert(json.message);
            }, 500);
          }
          else{
            alert(json.error);
          }
        }
        
    };

    //Edit a note
    const editNote=async function(id,title,description,tag){
        //TODO API CALL
        let url=`${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('inotebook_token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
          });
          const json=await response.json(); // parses JSON response into native JavaScript objects
        //function for client
        // for(let index=0;index<notes.length;index++){
        //     const element=notes[index];
        //     if(element._id==id){
        //         element.title=title;
        //         element.description=description;
        //         element.tag=tag;
        //         break;
        //     }
        // }
        if(json.success){
          getNotes();
          setTimeout(() => {
            alert(json.message);
          }, 500);
          
        }
        else{
          alert(json.error);
        }
    };


    return (
        <NoteContext.Provider value={{notes,addNote, deleteNote,editNote,getNotes,name,setName,fetchUserData}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;