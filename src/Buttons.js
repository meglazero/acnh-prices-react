import React from "react"

function Buttons(props){
    const { name } = props
    if(props.sortName){
        return(
            <button onClick={props.sortName}>Sort {name} by name</button>
        )
    } else if(props.sortPrice){
        return(
            <button onClick={props.sortPrice}>Sort {name} by price</button>
        )
    } else if(props.clearTable){
        return(
            <button onClick={props.clearTable}>Clear {name} mods</button>
        )
    } else if(props.monthFilter){
        return(
            <button onClick={props.monthFilter}>Filter {name} by month</button>
        )
    } else if(props.hourFilter){
        return(
            <button onClick={props.hourFilter}>Filter {name} by hour</button>
        )
    } else if(props.hourMonthFilter){
        return(
            <button onClick={props.hourMonthFilter}>Filter {name} by hour + month</button>
        )
    }
}

export default Buttons