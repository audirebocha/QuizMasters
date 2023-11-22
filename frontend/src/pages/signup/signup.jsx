import React, { useState } from "react";
import functions from '../../functions.js'
import axios from "axios";
import global from "../../../global.js";

export default function Signup() {
    const [username, setUsername] = React.useState("peter kimutai");
    const [email, setEmail] = React.useState("peter.kimutai@gmail.com");
    const [password, setPassword] = React.useState("peter.kimutai@gmail.com");
    const [Confirmpassword, setConfirmpassword] = React.useState("peter.kimutai@gmail.com");
    const [message, setMessage] = useState('')



    return (
        <div className="mv_main">

            <div className="center_container">
                <p className="logo">QuizMasters</p>
                <span>{message}</span>

                <div className="input_container">
                    <span className="input_label">Enter your username</span>
                    <input type="text" onChange={e => { setUsername(e.target.value) }} className="input_type1" value={username} />
                </div>

                <div className="input_container">
                    <span className="input_label">Email</span>
                    <input type="text" onChange={e => { setEmail(e.target.value) }} className="input_type1" value={email} />
                </div>

                <div className="input_container">
                    <span className="input_label">Enter your password</span>
                    <input type="password" onChange={e => { setPassword(e.target.value) }} className="input_type1" value={password} />
                </div>

                <div className="input_container">
                    <span className="input_label">Confirm password</span>
                    <input type="password" onChange={e => { setConfirmpassword(e.target.value) }} className="input_type1" value={Confirmpassword} />
                </div>

                <button className="button_type1" onClick={e => { send_registration_api() }}>Register</button>
            </div>

        </div>
    )


    function send_registration_api() {
        //Check password if equal
        if (password === Confirmpassword) {
            var data = { 'user_name': "Peter Kimutai", 'email': 'peter.kimutai@gmail.com', 'password': '123' }
            var url = "/register"
            var headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            var api_url = global.backend_server + url
            var result_data = null
            var result_data = axios.post(api_url, data, headers)
                .then(res => {
                    console.log(res.data)
                })
                .catch(e => { console.error(e) })
            console.log(result_data)
            return result_data
        }else{
            setMessage('Confirmation password missmatch')
        }
    }



}