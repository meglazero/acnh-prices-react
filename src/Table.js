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
            fishn: 2,
            fishi: 2,
            sean: 2,
            seai: 2,

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

    sortName(element){
        const arr = [...element]
        let itemn = 0
        let itemi = 0

        if(element === this.state.bugs){
            itemn = this.state.bugsn
            itemi = this.state.bugsi
        } else if (element === this.state.fish){
            itemn = this.state.fishn
            itemi = this.state.fishi
        } else if (element === this.state.sea){
            itemn = this.state.sean
            itemi = this.state.seai
        }

        if(element === this.state.bugs || element === this.state.fish){
            arr.sort(function (a, b) {
                if (itemn % 2 === 0) {
                    return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
                } else {
                    return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
                }
            })
        } else if (element === this.state.sea){
            arr.sort(function (a, b) {
                const aName = a.name.toLowerCase();
                const bName = b.name.toLowerCase();
                if (itemn % 2 == 0) {
                    return aName < bName ? -1 : aName > bName ? 1 : 0;
                } else {
                    return bName < aName ? -1 : bName > aName ? 1 : 0;
                }
            })
        }
    
            itemn = itemn % 2 === 0 ? 1 : 2;
            itemi = 2;
            
        if(element === this.state.bugs){
            return(
                this.setState({
                    bugs: arr,
                    bugsn: itemn,
                    bugsi: itemi
                })
            )
        } else if (element === this.state.fish){
            return(
                this.setState({
                    fish: arr,
                    fishn: itemn,
                    fishi: itemi
                })
            )
        } else if (element === this.state.sea){
            return(
                this.setState({
                    sea: arr,
                    sean: itemn,
                    seai: itemi
                })
            )
        }
    }

    sortPrice(element){
        const arr = [...element]
        let itemn = 0
        let itemi = 0

        if(element === this.state.bugs){
            itemn = this.state.bugsn
            itemi = this.state.bugsi
        } else if (element === this.state.fish){
            itemn = this.state.fishn
            itemi = this.state.fishi
        } else if (element === this.state.sea){
            itemn = this.state.sean
            itemi = this.state.seai
        }

        if(element === this.state.bugs || element === this.state.fish){
            arr.sort(function (a, b) {
                if (itemi % 2 == 0) {
                    return b[2] - a[2];
                } else {
                    return a[2] - b[2];
                }
            })
        } else if (element === this.state.sea){
            arr.sort(function (a, b) {
                if (itemi % 2 == 0) {
                    return b.sell - a.sell;
                } else {
                    return a.sell - b.sell;
                }
            })
        }
    
            itemi = itemi % 2 === 0 ? 1 : 2;
            itemn = 2;
            
        if(element === this.state.bugs){
            return(
                this.setState({
                    bugs: arr,
                    bugsn: itemn,
                    bugsi: itemi
                })
            )
        } else if (element === this.state.fish){
            return(
                this.setState({
                    fish: arr,
                    fishn: itemn,
                    fishi: itemi
                })
            )
        } else if (element === this.state.sea){
            return(
                this.setState({
                    sea: arr,
                    sean: itemn,
                    seai: itemi
                })
            )
        }
    }
    
    render(){
        return(
            <div className="tables">
                <Tablebox 
                    bugs={this.state.bugs}
                    sortName={this.sortName.bind(this, this.state.bugs)}
                    sortPrice={this.sortPrice.bind(this, this.state.bugs)}/>
                <Tablebox
                    fish={this.state.fish}
                    sortName={this.sortName.bind(this, this.state.fish)}
                    sortPrice={this.sortPrice.bind(this, this.state.fish)}/>
                <Tablebox
                    sea={this.state.sea}
                    convertTime={this.convertTime.bind(this)}
                    uppercaseFirstLetter={this.uppercaseFirstLetter.bind(this)}
                    sortName={this.sortName.bind(this, this.state.sea)}
                    sortPrice={this.sortPrice.bind(this, this.state.sea)}/>
            </div>
        )
    }
};

export default Table;