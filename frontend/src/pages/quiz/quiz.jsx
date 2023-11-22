import React from "react";

export default function Quiz(){
    return (
        <div class="mv_main2">

            <div class="center_container">

                <div class="question_container">
                    <span class="question">Question</span>
                    <span class="actual_question">
                        In what year did the United States
                        host the FIFA World Cup for the first time?
                    </span>
                </div>


                <div class="choices_container">
                    <div class="choice_container">
                        <div class="choice_label"><span>Choice</span></div>
                        <input type="radio"/>
                    </div>

                    <div class="choice_container">
                        <div class="choice_label"><span>Choice</span></div>
                        <input type="radio"/>
                    </div>

                    <div class="choice_container">
                        <div class="choice_label"><span>Choice</span></div>
                        <input type="radio"/>
                    </div>

                    <div class="choice_container">
                        <div class="choice_label"><span>Choice</span></div>
                        <input type="radio"/>
                    </div>
                </div>


                <button class="button_type4">Next</button>
            </div>

        </div>

    )
}