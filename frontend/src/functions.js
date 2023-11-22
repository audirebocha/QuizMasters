import global from "../global";
import axios from 'axios'


async function send_api(url,data){
    var headers={headers: {'Content-Type': 'application/json'},withCredentials: true}
    var api_url=global.backend_server+url
    var result_data=null
    var result_data =axios.post(api_url, data,headers)
            .then(res => { 
                console.log(res.data)
                result_data= res.data
                return res.data
             })
            .catch(e => { console.error(e) })
    console.log(result_data)
    return result_data
}



export default {send_api}