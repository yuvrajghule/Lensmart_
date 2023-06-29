import { useState, useEffect } from "react";
import "./login.css";
import axios from 'axios';
import { useNavigate, Link, json } from "react-router-dom";
import { doLogin, isLoggedIn } from "./auth/authentication";
import { ToastContainer, toast } from 'react-toastify';

export default function LoginPage(props) {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email:"",
        password:""
    });
    const [user, setUser] = useState(
        {
          userName:"",
          email:"",
          password:"",
          mobileNumber:"",
          role:""
        }
      );
    const handleLogin = async (e) =>{
        e.preventDefault();
        console.log(data);
        axios.post('http://localhost:8080/login',data)
        .then(response =>{
        console.log(`${response.data} from login`)
        if(response.data===true)
            {
                axios.get(`http://localhost:8080/getuser/${data.email}`).then(response=>
                {
                    console.log(response.data);
                    doLogin(response.data);

                }).catch(error=>
                    {
                        console.log(error);
                    })
                toast.success('login Successfull');
                props.changeLog();
                navigate("/home");
                
            }
                else{
                    alert("enter valid details");
                }
                
            }
            
        ).catch((error)=>
        {
            console.log(error);
            alert("enter valid details");
        }
        )
    }
    return (
        <>
            <div className="header">Login</div>
            <div id="loginBox">
                <input onChange={(e) => setData({...data,email:e.target.value})} className="input" id="email" placeholder="Enter email"></input><br />
                <input onChange={(e) => setData({...data,password:e.target.value})} type="password" className="input" id="password" placeholder="Enter password"></input>
                <div><button id="loginButton" onClick={handleLogin}>Login</button></div>
                <div>New user?<Link to="/register" style={{ textDecoration: 'none' }} > Sign Up</Link></div>

            </div>
        </>

    );
}

