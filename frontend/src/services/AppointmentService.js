  
import axios from 'axios'

export async function getAllEvents(startDate, endDate) {
    if(startDate && endDate){
        const response = await axios.get(`https://appoinment-scheduler-api.herokuapp.com/api/event?startDate=${startDate}&endDate=${endDate}`);
        response.data.map(event => {
            event.date = new Date(event.start_event).toLocaleDateString(),
            event.from = new Date(event.start_event).toLocaleTimeString(),
            event.to = new Date(event.end_event).toLocaleTimeString()
        })
        return await response.data;
    }
    return null
    
}