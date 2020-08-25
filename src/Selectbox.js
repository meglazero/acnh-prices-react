import React from 'react';

const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
]

const hours = [
    '12 AM','1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM',
    '12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM'
]

function Selectbox (props) {
    if(props.month){
        return(
            <select name="month" id="month" className="filters" value={props.time} onChange={props.monthChanged}>
                {console.log(props.time)}
                {months.map( (month, index) => (
                    <option value={index} key={month}>{month}</option>
                ))}
            </select>
        )
    }
    if(props.hour){
        return(
            <select name="hour" id="hour" className="filters" value={props.time} onChange={props.hourChanged}>
                {hours.map( (hour, index) => (
                    <option value={index} key={hour}>{hour}</option>
                ))}
            </select>
        )
    }
}

export default Selectbox;