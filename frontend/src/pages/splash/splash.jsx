import React from "react";
import { useNavigate } from "react-router-dom";
import '../../style.css'


export default function Splash(){
    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }


    return (
        <div className="mv_main">

            <div className="splash_screen">
                <p className="logo" onClick={(e)=>{nav('/index')}}>QuizMasters</p>
            </div>

        </div>
    )
}