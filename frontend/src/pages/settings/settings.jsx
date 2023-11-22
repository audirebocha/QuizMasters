import React from "react";

export default function Settings(){
    return (
        <div class="mv_main">

            <div class="center_container">

                <div class="input_container">
                    <span class="input_label">Enter your username</span>
                    <input type="text" class="input_type1"/>
                </div>

                <div class="input_container">
                    <span class="input_label">Email</span>
                    <input type="text" class="input_type1"/>
                </div>

                <div class="input_container">
                    <span class="input_label">Enter your password</span>
                    <input type="password" class="input_type1"/>
                </div>

                <div class="input_container">
                    <span class="input_label">Confirm password</span>
                    <input type="passwords" class="input_type1"/>
                </div>

                <button class="button_type1">Update</button>
            </div>

        </div>
    )
}