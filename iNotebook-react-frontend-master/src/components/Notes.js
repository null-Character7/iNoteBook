import React,{useContext,useEffect,useRef,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes() {

    const navigate=useNavigate();
    const [note,setNote]=useState({id:"",title:"",description:"",tag:"default"});
    const context = useContext(NoteContext);
    const { notes , getNotes, editNote } = context;
    useEffect(()=>{
        if(localStorage.getItem('inotebook_token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
        
    },[]);

    const ref=useRef(null);
    const refClose=useRef(null);


    const updateNote= function(currentNote){
        setNote({id:currentNote._id,title:currentNote.title,description:currentNote.description,tag:currentNote.tag});
        ref.current.click();
    };

    const handleClick=function(event){
        // event.preventDefault(); 
        // console.log("Editing the note",note);
        let a=window.confirm("Are you sure that you want to update the note?");
        if(a){
            refClose.current.click();
            editNote(note.id,note.title,note.description,note.tag);
            setNote({id:"",title:"",description:"",tag:"default"});
        }
        
    };
    

    const onChange=function(event){
        setNote({...note,[event.target.name]:event.target.value});
    };

    
    return (
        <div>
            <div className="container my-3">
                {/* input form for creating a note */}
                <AddNote/>
                {/* <!-- Button trigger modal --> */}
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel"> Edit Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    {/* form inside modal to update note */}
                    <form className='my-3'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label"><strong>Title</strong></label>
                            <input type="text" className="form-control" id="etitle" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"><strong>Description</strong></label>
                            <textarea rows="8" className="form-control" id="edescrition" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label"><strong>Tag</strong></label>
                            <input type="text" className="form-control" id="etag" name="tag" aria-describedby="emailHelp" value={note.tag} onChange={onChange}/>
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                        <button disabled={note.title.length<5 || note.description.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                    </div>
                    </div>
                </div>
                </div>


                <h1>Your Notes</h1>
                <div className="row">
                    <div className="container m-3">
                        {notes.length==0 && "No notes to display"}
                    </div>
                    {notes.map((note) => {
                        return <Noteitem note={note} updateNote={updateNote} key={note._id} />
                    })}
                </div>
            </div>
        </div>
    )
}
