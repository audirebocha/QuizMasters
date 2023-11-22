import React from "react";
import { useNavigate } from "react-router-dom";

export default function Index(){
    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }

    return (
        <div class="mv_main">

            <div class="center_container">
                <p class="logo">QuizMasters</p>

                <button class="button_type1" onClick={(e)=>{nav('/login')}}>Login</button>
                <button class="button_type1" onClick={(e)=>{nav('/signup')}} >Sign up</button>
            </div>

        </div>
    )
}
