import React, { Component } from 'react';
import BugTable from "./json/bugTable.json";
import FishTable from "./json/fishTable.json";
import SeaTable from "./json/seaTable.json";
import Buttons from "./Buttons";
import Tablebox from "./Tablebox";

SeaTable.sort(function (a, b) {
    return a.num < b.num ? -1 : a.num > b.num ? 1 : 0;
});

function currentTime(){
    let datetime = new Date();
    let curMonth = datetime.getMonth();
    let curHour = datetime.getHours();

    return { month: curMonth, hour: curHour }
}

class Table extends Component{
    constructor() {
        super();
        this.state = {
            bugs: BugTable,
            fish: FishTable,
            sea: SeaTable,
            time: currentTime(),
            bugsn: 2,
            bugsi: 2,
        }
        console.log('Month: ' + this.state.time.month)
        console.log('Hour: ' + this.state.time.hour)
    }

    convertTime(element){
        if (element.isAllDay === true) {
            return 'All day';
        } else {
            let hourStart = parseInt(element.activeHours[0][0], 10);
            let hourEnd = parseInt(element.activeHours[0][1], 10);
            hourStart > 12 ? hourStart = hourStart - 12 + ' PM' : hourStart += ' AM';
            hourEnd > 12 ? hourEnd = hourEnd - 12 + ' PM' : hourEnd += ' AM';
            return hourStart + ' - ' + hourEnd;
        };
    }
    
    uppercaseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    sortName(){
            const bugs = [...this.state.bugs]
            let bugsn = this.state.bugsn
            let bugsi = this.state.bugsi
            bugs.sort(function (a, b) {
                if (bugsn % 2 == 0) {
                    return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
                } else {
                    return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
                }
            })
    
            bugsn = bugsn % 2 == 0 ? 1 : 2;
            bugsi = 2;
            
            return(
                this.setState({
                    bugs: bugs,
                    bugsn: bugsn,
                    bugsi: bugsi
                })
            )
    }
    
    render(){
        return(
            <div>
                <button onClick={this.sortName.bind(this)}></button>
            <div className="tables">
                <Tablebox 
                    bugs={this.state.bugs}
                    sortName={this.sortName.bind(this)}/>
                <Tablebox
                    fish={this.state.fish}/>
                <Tablebox
                    sea={this.state.sea}
                    convertTime={this.convertTime.bind(this)}
                    uppercaseFirstLetter={this.uppercaseFirstLetter.bind(this)}/>
            </div>
            </div>
        )
    }
};

export default Table;