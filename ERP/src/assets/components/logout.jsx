import React,{useEffect} from "react";
import { useNavigate } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';


export default function Logout(){

    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.setItem("id","");
        localStorage.setItem("access_token","");
        console.log("Data Flushed");
        navigate('/login');
    }, [navigate]);



}