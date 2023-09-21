import React,{useContext,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function Noteitem(props) {

    const {deleteNote}=useContext(NoteContext);
    const {note,updateNote}=props;

    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <span className="badge text-bg-success">{note.tag}</span>
                <i className="fa-solid fa-trash mx-2" onClick={()=>deleteNote(note._id)}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
            </div>
            </div>
        </div>
    )
}
