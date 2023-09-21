import React,{useContext,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function AddNote() {

  const context = useContext(NoteContext);
  const {  addNote } = context;
  const [note,setNote]=useState({title:"",description:"",tag:""});
  const handleClick=function(event){
    event.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""});
  };

  const onChange=function(event){
    setNote({...note,[event.target.name]:event.target.value});
  };

  return (
    <div>
      <div className="container my-3">
        <h1>Add Your Note</h1>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label"><strong>Title</strong></label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label"><strong>Description</strong></label>
            <textarea rows="8" className="form-control" id="descrition" name="description" value={note.description} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label"><strong>Tag</strong></label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}
