import { apiUrl } from "../Constant";
import axios from "axios";


function EndSubscription({ subscriptionId, onEnd }){
    const handleEnd = async () =>{
        try{
            await axios.patch(apiUrl+`subscription/${subscriptionId}/end`)
        } catch(e){
            console.log(e);
            alert('Error ending subscription')
            onEnd()
        }
    }

    return (
        <button onClick={handleEnd}>
            EndSubscription
        </button>
    )
}

export default EndSubscription