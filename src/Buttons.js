import React from "react"

function Buttons(props){
    if(props.sortName){
        return(
            <button onClick={props.sortName}>Sort {props.name} by name</button>
        )
    } else if(props.sortPrice){
        return(
            <button onClick={props.sortPrice}>Sort {props.name} by price</button>
        )
    }
}

export default Buttons