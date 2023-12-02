import React from "react";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";

import global from "../../../../global";
import axios from "axios";

export default function Results(props) {
    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }

    const [choices, setChoices] = useState([])

    useEffect((() => {
        send_scores()
    }), [])


    function send_scores(){
        var data = { 'score': props.mark }
        var url = "/update_score"
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
    

    return (
        <>
            <div className="question_container">
                <span className="question">Your marks</span>
                <span className="actual_question">You scored {props.mark} in this test</span>
            </div>

            <button className="button_type4" onClick={e => {  nav('/home') }} > Continue</button>
        </>
    )
}