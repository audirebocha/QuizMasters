import React from "react";
import { useNavigate } from "react-router-dom";
import global from "../../../global.js";
import axios from "axios";

export default function Login(){
    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }

    const [password, setPassword] = React.useState("peter.kimutai@gmail.com");
    const [email, setEmail] = React.useState("peter.kimutai@gmail.com");

    return (
        <div class="mv_main">

            <div class="center_container">
                <p class="logo">QuizMasters</p>

                <div class="input_container">
                    <span class="input_label">Email</span>
                    <input type="text" onChange={e => { setEmail(e.target.value) }} class="input_type1" value={email}/>
                </div>

                <div class="input_container">
                    <span class="input_label">Enter your password</span>
                    <input type="password" onChange={e => { setPassword(e.target.value) }} class="input_type1" value={password}/>
                </div>

                <button class="button_type1" onClick={(e)=>{send_login_data()}}>Login</button>
            </div>

        </div>
    )



    function send_login_data() {
        //Check password if equal
        if (password.length != 0) {
            var data = { 'email': email, 'password': password }
            var url = "/register"
            var headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            var api_url = global.backend_server + url
            var result_data = null
            var result_data = axios.post(api_url, data, headers)
                .then(res => {
                    console.log(res.data)
                    nav('/home')
                })
                .catch(e => { console.error(e) })
            console.log(result_data)
            return result_data
        }else{
            setMessage('Confirmation password missmatch')
        }
    }
}