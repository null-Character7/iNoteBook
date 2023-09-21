import React from 'react';
// import { useNavigate } from 'react-router-dom';

export default function About() {

  // const navigate=useNavigate();
  // // console.log(localStorage.getItem("inotebook_token"));
  // if(localStorage.getItem('inotebook_token')){
  //   navigate("/login");
  //   return ;
  // }
  return (
    <div className='container'>
      <h4 className='my-5'>
        This is a web based notebook app where you can create, update and delete your notes. The best part is that you can access your notes from any devices with stable internet connection. 
      </h4>
    </div>
  )
}
