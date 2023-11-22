import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style.css'
import global from "../../../global";
import axios from "axios";

export default function Home() {
    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }

    useEffect((()=>{
        console.log('Site Loaded')
        setCreds()
        get_subjects()
    }),[])

    const [subjects, setSubjects] = useState(["Math", "Science"])
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    return (
        <div className="mv_main2">

            <div className="bottom_container">

                <div className="quiz_choice_container">

                    {
                        subjects.map((subject, key) => {
                            return (<button key={key} className="button_type2" onClick={(e) => { nav('/quiz/'+subject) }}>{subject}</button>)
                        })
                    }
                </div>

                <div className="controls_container">
                    <div className="button_type3" onClick={e => { nav('/settings') }}>
                        <img src="./assets/settings.svg" alt="" />
                        <span>Settings</span>
                    </div>
                    <div className="button_type3" onClick={e => { nav('/board') }}>
                        <img src="./assets/board.svg" alt="" />
                        <span>Board</span>
                    </div>
                </div>

            </div>

        </div>
    )

    function setCreds(){
        setEmail(localStorage.getItem('email'))
        setPassword(localStorage.getItem('password'))
        console.log(email,password)
    }



    function get_subjects() {
        //Check password if equal
        var data = { 'email': email, 'password': password }
        var url = "/get_subjects"
        var headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        var api_url = global.backend_server + url
        var result_data = null
        var result_data = axios.post(api_url, data, headers)
            .then(res => {
                console.log(res.data)
                var response_data = res.data
                //localStorage.setItem('email',"peter.kimutai@gmail.com")
            })
            .catch(e => { console.error(e) })
    }
}