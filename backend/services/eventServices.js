const config = require("../config");
var moment = require("moment-timezone");

//This function will return all the time slots based on current appointment configuration in .env file

function getSlots(date, timezone) {   

    // Getting values from slotConfig using destructuring
    const { slotDurationHours, slotDurationMinutes, startTime, endTime, desiredTimezone } =
        config;

    let defaultDate = date;
    let slots = [];
    let _timeArrStartTime;
    let _timeArrEndTime;
    let _tempSlotStartTime;
    let _endSlot;
    let _startSlot;

    let startTime_hr = startTime.split(':')[0]
    let startTime_min = startTime.split(':')[1]
    let endTime_hr = endTime.split(':')[0]
    let endTime_min = endTime.split(':')[1]

    let aaaa = moment(moment(date).tz(desiredTimezone).format()).set('hour', endTime_hr).set('minute', endTime_min).format('YYYY-MM-DD HH:mm:ss')
    let ctz = moment.tz.guess();

    // Creating time stamp using time from timeArr and default date
    _timeArrStartTime = moment(moment(defaultDate).tz(desiredTimezone).format()).set('hour',startTime_hr).set('minute', startTime_min).valueOf();
    _timeArrEndTime = moment(moment(defaultDate).tz(desiredTimezone).format()).set('hour',endTime_hr).set('minute', endTime_min).valueOf();
    _tempSlotStartTime = _timeArrStartTime;

    // Loop around till _tempSlotStartTime is less end time from timeArr
    while (moment(new Date(_tempSlotStartTime)).valueOf() < moment(new Date(_timeArrEndTime)).valueOf()) {
        _endSlot = new Date(_tempSlotStartTime);
        _startSlot = new Date(_tempSlotStartTime);

        //Adding minutes and hours from config to create slot and overiding the value of _tempSlotStartTime
        _tempSlotStartTime = _endSlot.setHours(
            parseInt(_endSlot.getHours()) + parseInt(slotDurationHours)
        );
        _tempSlotStartTime = _endSlot.setMinutes(
            parseInt(_endSlot.getMinutes()) + parseInt(slotDurationMinutes)
        );

        // Check _tempSlotStartTime is less than end time after adding minutes and hours, if true push into slotsArr
        if (new Date(_tempSlotStartTime).getTime() <= new Date(_timeArrEndTime).getTime()) {
             moment_start = moment(new Date(_startSlot));
             moment_end = moment(_endSlot);

            slots.push(moment_start.tz(timezone).format().substring(0, 19));
        }
    }

    return slots;
}

function getAvailableSlots(slots, filteredEventBasedOnDates) {
    if (filteredEventBasedOnDates && filteredEventBasedOnDates.length > 0) {
        let tmp_slots = [...slots];
        tmp_slots.forEach(slot => {
            if(!checkIfSlotIsAvailable(slot,filteredEventBasedOnDates)){
                let index = slots.findIndex(s => s == slot );
                slots.splice(index,1);
            }
        })
    }
    return slots;
}

function checkIfSlotIsAvailable(slot, filteredEventBasedOnDates){
    let returnValue = true;
    filteredEventBasedOnDates.forEach(event => {
        if(new Date(slot).getTime() === new Date(event.start_event).getTime()) {
            returnValue = false;
            return false;
        }
        else if (new Date(slot).getTime() === new Date(event.end_event).getTime()){
            returnValue = true;
            return false;
        }
        else if (new Date(slot).getTime() > new Date(event.start_event).getTime() && new Date(slot).getTime() <= new Date(event.end_event).getTime()) {
            returnValue = false;
            return false;
        }        
    })

    return returnValue;
}

function validateEvent(start_event, end_event, eventsArray) {
    if(eventsArray.length == 0) return true
    if (start_event > end_event) return false;

    const { slotDurationHours, slotDurationMinutes, startTime, endTime } = config;

    let default_date = start_event.toISOString().substring(0, 10);
    let _timeArrStartTime = moment(default_date + " " + startTime).valueOf();
    let _timeArrEndTime = moment(default_date + " " + endTime).valueOf();
    let minStartEventTime = moment(_timeArrStartTime);
    let maxStartEventTime = moment(
        new Date(_timeArrEndTime).valueOf() - slotDurationMinutes * 60000
    );

    if (start_event.valueOf() < minStartEventTime.valueOf() || start_event.valueOf() > maxStartEventTime.valueOf()) {
        return false;
    }

    const starteventISO = start_event.valueOf();
    const endeventISO = end_event.valueOf();
    let returnValue = true;

    eventsArray.forEach(event => {
        if((moment(event.start_event).valueOf() >= starteventISO && moment(event.start_event).valueOf() < endeventISO)
            || (moment(event.end_event).valueOf() > starteventISO && moment(event.end_event).valueOf() <= endeventISO)){
                returnValue = false;
                return false;
            }
    })

    return returnValue;
}

function checkForOverlappingEvents(start_event, end_event, eventsArray){
    let returnValue = true;
    let start_event_time = moment(start_event).valueOf(); 
    let end_event_time = moment(end_event).valueOf(); 

    eventsArray.forEach(event => {
        let event_start_time = moment(event.start_event).valueOf();
        let event_end_time = moment(event.end_event).valueOf(); 

        if(event_start_time < start_event_time && start_event_time < event_end_time){
            returnValue = false;
            return false; //start_event_time falls between start and end time of an existing event
        }
        else if(event_start_time < end_event_time && end_event_time < event_end_time){
            returnValue = false;
            return false; //end_event_time falls between start and end time of an existing event
        }
        else if((start_event_time < event_start_time && event_start_time <= end_event_time) && (start_event_time < event_end_time && event_end_time <= end_event_time)){
            returnValue = false;
            return false; //event_start_time & event_end_time both falls between start_event and end_event
        }

    })
    return returnValue;
}

function filterEventsBasedOnStartAndEndDates(eventsArray, start, end){
    const startDate = moment(start);
    const endDate = moment(end);

    let e = eventsArray.filter(event => {
        let start_event = new Date(event.start_event);

        if(moment(startDate).isSame(endDate)){
            return moment(start_event).isSame(startDate, 'day');
        }

        let a = moment(start_event).isSameOrAfter(startDate, 'day') && moment(start_event).isBefore(endDate, 'day')
        let b = moment(start_event).isAfter(startDate, 'day') && moment(start_event).isSameOrBefore(endDate, 'day')
        return  a || b;
            
    });
    return e;
}

function getUTCFormat(date){
    return new moment(date, "YYYY-MM-DDTHH:mm").utc().format().substring(0, 19);
}

function getTimeZoneFormat(date, timezone){
    return moment.utc(date).tz(timezone).format()  
}

module.exports = {
    getSlots,
    getAvailableSlots,
    validateEvent,
    filterEventsBasedOnStartAndEndDates,
    getUTCFormat,
    getTimeZoneFormat,
    checkForOverlappingEvents
};