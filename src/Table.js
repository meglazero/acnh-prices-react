import React, { Component, useState } from 'react';
import Tablebox from "./Tablebox";
import Selectbox from "./Selectbox";

function currentTime() {
    let datetime = new Date();
    let curMonth = datetime.getMonth();
    let curHour = datetime.getHours();

    return { time: datetime, month: curMonth, hour: curHour, flag: false }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

class Table extends Component {
    constructor() {
        super();
        this.state = {
            time: currentTime(),
        }
    }

    monthChanged(event) {
        const time = {...this.state.time}
        time.month = Number(event.target.value)
        time.flag = true
        this.setState({
            time
        })
    }

    hourChanged(event) {
        const time = {...this.state.time}
        time.hour = Number(event.target.value)
        time.flag = true
        this.setState({
            time
        })
    }

    async componentDidMount(){
        let time = {...this.state.time}
        while (time.flag === false){
            time = {...this.state.time}
            if(time.flag !== true){
                this.setState({
                    time: currentTime()
                })
            }
            await sleep(1000)
        }
    }

    render() {
        return (
            <div>
                <div className="time">
                    <Selectbox 
                        month="month"
                        time={this.state.time.month}
                        monthChanged={this.monthChanged.bind(this)}/>
                    <Selectbox 
                        hour="hour"
                        time={this.state.time.hour}
                        hourChanged={this.hourChanged.bind(this)}/>
                    <p className="time">{String(this.state.time.time)}</p>
                </div>
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
            </div>
        )
    }
};

export default Table;