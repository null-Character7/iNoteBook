import React,{useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';




// const host=process.env.REACT_APP_BACKEND_URL;
const host="https://inotebookbackend-a8d5.onrender.com";



export default function Login() {


    const [credentials,setCredentials]=useState({email:"",password:""});
    const navigate = useNavigate();

    const handleSubmit=async function(event){
        event.preventDefault();
        let url=`${host}/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials), // body data type must match "Content-Type" header
          });
          const json=await response.json();
        //   console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('inotebook_token',json.authtoken);
            // history.push("/");
            navigate('/');
            setTimeout(() => {
                alert("Login Successful");
            }, 300);
          }
          else{
            alert("Invalid credentials");
          }
    }

    const onChange=function(event){
        setCredentials({...credentials,[event.target.name]:event.target.value});
    };


    return (
        <div className='container d-flex justify-content-center my-5 '>
            <form  onSubmit={handleSubmit}>
                <div className='border border-primary border-3 p-5'>
                    <h1  style={{textAlign:"center",color:"#0d6efd",marginTop: "0px",marginBottom: "2.5rem"}}>Login</h1>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>

            </form>
        </div>
    )
}
