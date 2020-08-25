import React, { Component } from 'react';
import Tablebox from "./Tablebox";

function currentTime() {
    let datetime = new Date();
    let curMonth = datetime.getMonth();
    let curHour = datetime.getHours();

    return { month: curMonth, hour: curHour }
}

class Table extends Component {
    constructor() {
        super();
        this.state = {
            time: currentTime(),

        }
        // console.log('Month: ' + this.state.time.month)
        // console.log('Hour: ' + this.state.time.hour)
    }

    render() {
        return (
            <div className="tables">
                <Tablebox
                    bugs='bugs'
                    time={this.state.time} />
                <Tablebox
                    fish='fish'
                    time={this.state.time} />
                <Tablebox
                    sea='sea'
                    time={this.state.time} />
            </div>
        )
    }
};

export default Table;