import { apiUrl } from "../Constant";
import axios from "axios";


function EndSubscription({ subscriptionId, onEnd }){
    const handleEnd = async () =>{
        try{
            await axios.patch(apiUrl+`subscription/end/${subscriptionId}/`)
            alert('Subscription ended successfully')
            onEnd()
        } catch(e){
            console.log(e);
            alert('Error ending subscription')
        }
    }

    return (
        <button onClick={handleEnd}>
            EndSubscription
        </button>
    )
}

export default EndSubscription