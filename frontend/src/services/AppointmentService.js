  
import axios from 'axios'
import * as moment from 'moment-timezone'

export async function getAllEvents(startDate, endDate) {
    if(startDate && endDate){
        let timezone = moment.tz.guess();
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/event?startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`);
        response.data.map(event => {
            event.date = new Date(event.start_event).toLocaleDateString(),
            event.from = new Date(event.start_event).toLocaleTimeString(),
            event.to = new Date(event.end_event).toLocaleTimeString()
        })
        return await response.data;
    }
    return null
    
}

export async function getFreeSlots(date, timezone) {
    if(date && timezone){
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/freeSlots?date=${date}&timezone=${timezone}`);
        response.data.map(slot => {
            return moment(slot).tz(timezone)
        })
        return await response.data;
    }
    return null
    
}

export async function addEvent(datetime, duration) {
    if(datetime){
        let timezone = moment.tz.guess();
        let event = {
            start_event: datetime,
            end_event: moment(datetime).add('minutes', duration).format().substring(0,19),
            timezone
        }
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/event`, event);
        return await response.data;
    }
    return null
    
}
