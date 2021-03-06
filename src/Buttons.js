import React from "react"

function Buttons(props) {
    const { name } = props
    if (props.sortName) {
        return (
            <button onClick={props.sortName} className={name}>Sort {name} by name</button>
        )
    } else if (props.sortPrice) {
        return (
            <button onClick={props.sortPrice} className={name}>Sort {name} by price</button>
        )
    } else if (props.clearTable) {
        return (
            <button onClick={props.clearTable} className={name}>Clear {name} mods</button>
        )
    } else if (props.monthFilter) {
        return (
            <button onClick={props.monthFilter} className={name}>Filter {name} by month</button>
        )
    } else if (props.hourFilter) {
        return (
            <button onClick={props.hourFilter} className={name}>Filter {name} by hour</button>
        )
    } else if (props.hourMonthFilter) {
        return (
            <button onClick={props.hourMonthFilter} className={name}>Filter {name} by hour + month</button>
        )
    }
}

export default Buttons