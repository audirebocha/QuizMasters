import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import global from "../../../global.js";
import axios from "axios";

export default function Login(){
    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }

    const [password, setPassword] = useState("123");
    const [email, setEmail] = useState("peter.kimutai@gmail.com");
    const [message, setMessage] = useState('')

    return (
        <div className="mv_main">

            <div className="center_container">
                <p className="logo">QuizMasters</p>
                <span>{message}</span>

                <div className="input_container">
                    <span className="input_label">Email</span>
                    <input type="text" onChange={e => { setEmail(e.target.value) }} className="input_type1" value={email}/>
                </div>

                <div className="input_container">
                    <span className="input_label">Enter your password</span>
                    <input type="password" onChange={e => { setPassword(e.target.value) }} className="input_type1" value={password}/>
                </div>

                <button className="button_type1" onClick={(e)=>{send_login_data()}}>Login</button>
            </div>

        </div>
    )



    function send_login_data() {
        //Check password if equal
        if (password.length != 0) {
            var data = { 'email': email, 'password': password }
            var url = "/login"
            var headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            var api_url = global.backend_server + url
            var result_data = null
            var result_data = axios.post(api_url, data, headers)
                .then(res => {
                    console.log(res.data)
                    var response_data=res.data
                    if (response_data['code']===2){
                        localStorage.setItem('email',email)
                        localStorage.setItem('password',password)
                        nav('/home')
                    }else if(response_data['code']){
                        setMessage(response_data['message'])
                    }
                    //localStorage.setItem('email',"peter.kimutai@gmail.com")
                })
                .catch(e => { console.error(e) })
            console.log(result_data)
            return result_data
        }else{
            setMessage('Confirmation password missmatch')
        }
    }
}