import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../Constant";

function ExtendSubscription({ subscriptionId, onExtend }){
    const[newEndDate, setNewEndDate] = useState('')

    const handleExtend = async (e) =>{
        e.preventDefault()
        try{
            await axios.patch(apiUrl+`subscription/extend/${subscriptionId}/`, {
                end_date: newEndDate
            })
            alert('Subscription extended successfully')
            onExtend()
        } catch(e){
            console.log(e);
            alert("Error extending subscription")
        }
    }
    return (
        <form onSubmit={handleExtend}>
            <input 
                type="date" 
                value={newEndDate}
                onChange={(e)=>setNewEndDate(e.target.value)}
                required
            />
            <button type="submit">Extend Subscription</button>
        </form>
    )
}

export default ExtendSubscription