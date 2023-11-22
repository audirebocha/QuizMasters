import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import global from "../../../global";
import axios from "axios";
// *************Component*********
import Question from "./components/question";

export default function Quiz() {

    const { subject } = useParams();
    const [questions, setQuestions] = useState()  
    const [question_count, set_question_count]=useState(0)  
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [quiz_status,set_quiz_status]= useState(false)

    useEffect((() => {
        getQuestions()
    }), [])

    return (
        <div className="mv_main2">

            <div className="center_container">

                {(()=>{
                    if(quiz_status){
                        return <Question question={questions[question_count]['question']} choices={questions[question_count]['choices']} />
                    }
                })()}
                <button className="button_type4">Next</button>
            </div>

        </div>

    )


    function getQuestions() {
        //Check password if equal
        var data = { 'email': email, 'password': password,'subject':subject }
        var url = "/get_questions"
        var headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        var api_url = global.backend_server + url
        var result_data = null
        var result_data = axios.post(api_url, data, headers)
            .then(res => {
                console.log(res.data)
                var response_data = res.data
                if(response_data.code===101){
                    setQuestions(response_data['data'])
                    set_quiz_status(true)
                }
                //localStorage.setItem('email',"peter.kimutai@gmail.com")
            })
            .catch(e => { console.error(e) })
    }
}