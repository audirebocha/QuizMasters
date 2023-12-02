import React, { useEffect, useState } from "react";
import global from "../../../global";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Board() {
    const [board, set_board] = useState([])


    useEffect((() => {
        get_board()
    }), [])

    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }


    function get_board() {
        var data = { 'message': 'send me the leader board' }
        var url = "/get_leader_board"
        var headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        var api_url = global.backend_server + url
        var result_data = null
        var result_data = axios.post(api_url, data, headers)
            .then(res => {
                console.log(res.data)
                var response_data = res.data
                //localStorage.setItem('email',"peter.kimutai@gmail.com")
                if(response_data.code===7){
                    set_board(response_data.data)
                }
            })
            .catch(e => { console.error(e) })
    }

    return (
        <div className="mv_main2">

            <div className="center_container">


                <div className="choices_container">

                    {board.map((user, key) => {
                        return (
                            <div className="choice_container" key={key}>
                                <div className="choice_label"><span>{key+1} {user.username}</span></div>
                                <span>{user.score}</span>
                            </div>
                        )

                    })}


                </div>


                <button className="button_type4" onClick={e=>{nav('/home')}}>Back</button>
            </div>

        </div>
    )
}