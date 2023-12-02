import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import global from "../../../global";
import axios from "axios";
// *************Component*********
import Question from "./components/question";
import Results from "./components/results";

export default function Quiz() {

    const { subject } = useParams();
    const [questions, setQuestions] = useState()
    const [question_count, set_question_count] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [quiz_status, set_quiz_status] = useState(false)
    const [answers, setAnswers] = useState({})
    const [correct_answers, set_correct_answers] = useState({})
    const [prompt_message, set_prompt_answers] = useState('Next')
    const [marks, set_marks] = useState(0)

    useEffect((() => {
        getQuestions()
    }), [])

    return (
        <div className="mv_main2">

            <div className="center_container">

                {(() => {
                    if (quiz_status) {
                        return <Question prompt={prompt_message} next={next_question} question={questions[question_count]['question']} id={questions[question_count]['id']} choices={questions[question_count]['choices']} answer_function={answer_question} />
                    } else {
                        return <Results mark={marks} />
                    }
                })()}

            </div>

        </div>
    )

    function answer_question(id, answer) {
        var question_id = questions[question_count]['id']
        var new_answers = Object.assign({}, answers, { [question_id]: answer });
        setAnswers(new_answers)
        console.log(answers)
    }


    function next_question() {
        //Check if the current question is answered
        if (answers[questions[question_count]['id']] === undefined) {
            console.log('Please answer the current question')
            return
        } else {
            //Check if its the last question
            if (question_count === questions.length - 1) {
                //If its the last question, Submit the question, 
                console.log('This is the last question')
                //Mark the users answers
                mark_answers()
            } else {
                //If its not add the count
                set_question_count(question_count + 1)
                if (question_count + 1 === questions.length - 1) {
                    set_prompt_answers('Finish')
                }
            }
        }
    }



    function mark_answers() {
        var new_mark = marks
        for (var answer_id in answers) {
            console.log(answers[answer_id], correct_answers[answer_id])
            if (String(answers[answer_id]) === correct_answers[answer_id]) {
                set_marks(new_mark+=10)
            }
        }
        console.log('You scored:', new_mark)
        set_quiz_status(false)
    }


    function getQuestions() {
        //Check password if equal
        var data = { 'email': email, 'password': password, 'subject': subject }
        var url = "/get_questions"
        var headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        var api_url = global.backend_server + url
        var result_data = null
        var result_data = axios.post(api_url, data, headers)
            .then(res => {
                console.log(res.data)
                var response_data = res.data
                if (response_data.code === 101) {
                    setQuestions(response_data['data'])
                    set_quiz_status(true)
                    var data = response_data['data']
                    var correct_ans = {}
                    data.map((question) => {
                        console.log(question['answer'])
                        correct_ans[question['id']] = question['answer']
                    })
                    set_correct_answers(correct_ans)
                    console.log(correct_ans)
                }
                //localStorage.setItem('email',"peter.kimutai@gmail.com")

            })
            .catch(e => { console.error(e) })
    }
}