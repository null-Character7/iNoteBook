import React,{useState,useEffect,useContext} from 'react';
import Notes from './Notes';
import NoteContext from '../context/notes/NoteContext';



export default function Home() {
  const {name,fetchUserData}=useContext(NoteContext);


  useEffect(()=>{
    fetchUserData();
  },[]);

  return (
    <div>
      <h3 className='text-center my-3'>Hello {name}</h3>
      {/* for displaying all notes */}
      <Notes />
    </div>
  )
}
