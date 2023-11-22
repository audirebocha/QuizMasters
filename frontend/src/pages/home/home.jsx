import React from "react";
import { useNavigate } from "react-router-dom";
import '../../style.css'

export default function Home(){
    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }


    return (
        <div className="mv_main2">

            <div className="bottom_container">

                <div className="quiz_choice_container">
                    <button className="button_type2" onClick={(e)=>{nav('/quiz')}}>Science</button>
                    <button className="button_type2">Math</button>
                    <button className="button_type2">English</button>
                </div>

                <div className="controls_container">
                    <div className="button_type3" onClick={e=>{nav('/settings')}}>
                        <img src="./assets/settings.svg" alt=""/>
                        <span>Settings</span>
                    </div>
                    <div className="button_type3" onClick={e=>{nav('/board')}}>
                        <img src="./assets/board.svg" alt=""/>
                        <span>Board</span>
                    </div>
                </div>

            </div>

        </div>
    )
}