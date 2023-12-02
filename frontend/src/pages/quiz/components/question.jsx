import React from "react";
import { useState, useEffect } from "react";
import { render } from "react-dom";

export default function Question(props) {

    const [choices, setChoices] = useState([])

    useEffect((() => {
        setChoices(props.choices)
    }), [])

    return (
        <>
            <div className="question_container">
                <span className="question">Question</span>
                <span className="actual_question">{props.question}</span>
            </div>


            <div className="choices_container">

                {props.choices.map((choice, key) => {
                    return (
                        
                            <div key={key} className="choice_container" onClick={e => { console.log(key); props.answer_function(props.id, key) }}>
                                <div className="choice_label"><span>{choice}</span></div>
                                <input type="radio" />
                            </div>
                        
                    )
                })}
            </div>

            <button className="button_type4" onClick={e => { props.next() }} >{props.prompt}</button>
        </>
    )
}