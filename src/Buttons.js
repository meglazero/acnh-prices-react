import React from "react"

function Buttons(props){
    if(props.sortName){
        return(
            <button onClick={props.sortName(props.bugs)}>Sort Name</button>
        )
    }
}

export default Buttons