import React, { Component } from 'react';
import Buttons from './Buttons';
import BugTable from "./json/bugTable.json";
import FishTable from "./json/fishTable.json";
import SeaTable from "./json/seaTable.json";

SeaTable.sort(function (a, b) {
    return a.num < b.num ? -1 : a.num > b.num ? 1 : 0;
});


class Tablebox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            itemn: 2,
            itemi: 2,
        }
    }

    convertTime(element) {
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

    sortName(element) {
        const arr = [...element]
        let itemn = this.state.itemn
        let itemi = this.state.itemi

        if (this.props.bugs || this.props.fish) {
            arr.sort(function (a, b) {
                if (itemn % 2 === 0) {
                    return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
                } else {
                    return b[0] < a[0] ? -1 : b[0] > a[0] ? 1 : 0;
                }
            })
        } else if (this.props.sea) {
            arr.sort(function (a, b) {
                const aName = a.name.toLowerCase();
                const bName = b.name.toLowerCase();
                if (itemn % 2 === 0) {
                    return aName < bName ? -1 : aName > bName ? 1 : 0;
                } else {
                    return bName < aName ? -1 : bName > aName ? 1 : 0;
                }
            })
        }

        itemn = itemn % 2 === 0 ? 1 : 2;
        itemi = 2;

        this.setState({
            arr: arr,
            itemn: itemn,
            itemi: itemi
        })
    }

    sortPrice(element) {
        const arr = [...element]
        let itemn = this.state.itemn
        let itemi = this.state.itemi

        if (this.props.bugs || this.props.fish) {
            arr.sort(function (a, b) {
                if (itemi % 2 === 0) {
                    return b[2] - a[2];
                } else {
                    return a[2] - b[2];
                }
            })
        } else if (this.props.sea) {
            arr.sort(function (a, b) {
                if (itemi % 2 === 0) {
                    return b.sell - a.sell;
                } else {
                    return a.sell - b.sell;
                }
            })
        }

        itemi = itemi % 2 === 0 ? 1 : 2;
        itemn = 2;

        this.setState({
            arr: arr,
            itemn: itemn,
            itemi: itemi
        })
    }

    clearTable(element) {
        this.setState({
            itemn: 2,
            itemi: 2,
        })
        let arr = BugTable
        if (this.props.fish) { arr = FishTable }
        else if (this.props.sea) { arr = SeaTable }
        return (this.setState({ arr: arr }))
    }

    monthFilter(element) {
        this.setState({
            itemn: 2,
            itemi: 2,
        })
        if (this.props.bugs || this.props.fish) {
            const key = element === BugTable ? 5 : 6;
            const arr = [...element].filter(element => {
                return (element[key + Number(
                    this.props.time.month) + 1] === "✓")
            })
            return (this.setState({ arr: arr }))
        } else if (this.props.sea) {
            const arr = [...element].filter((element) => {
                return (element.activeMonths.northern
                    .some(item => item.month === Number(this.props.time.month + 1)))
            })
            return (this.setState({ arr: arr }))
        }
    }

    hourFilter(element) {
        this.setState({
            itemi: 2,
            itemn: 2,
        })
        if (this.props.bugs || this.props.fish) {
            const key = element === BugTable ? 5 : 6;
            const arr = [...element].filter(element => {
                return element[key].includes(Number(this.props.time.hour))
            })
            return (this.setState({ arr: arr }))
        } else if (this.props.sea) {
            const arr = [...element].filter((element) => {
                const start = Number(element.activeMonths.northern[0].activeHours[0][0]);
                const end = Number(element.activeMonths.northern[0].activeHours[0][1]);
                const hour = this.props.time.hour

                let PMStart = false
                let AMEnd = false

                if (start > 12) { PMStart = true }
                if (end < 13) { AMEnd = true }

                if (PMStart && AMEnd) {
                    if (Number(hour) < 13) {
                        return Number(hour) < end
                    } else {
                        return Number(hour) >= start
                    }
                } else {
                    return start < Number(hour) && Number(hour) < end
                }
            })
            return (this.setState({ arr: arr }))
        }
    }

    hourMonthFilter(element) {
        this.setState({
            itemn: 2,
            itemi: 2,
        })
        if (this.props.bugs || this.props.fish) {
            const key = element === BugTable ? 5 : 6;
            const arr = [...element].filter(element => {
                return (element[key].includes(Number(this.props.time.hour)) &&
                    element[key + Number(this.props.time.month) + 1] === "✓")
            })
            return (this.setState({ arr: arr }))
        } else if (this.props.sea) {
            const arr = [...element].filter((element) => {
                const start = Number(element.activeMonths.northern[0].activeHours[0][0]);
                const end = Number(element.activeMonths.northern[0].activeHours[0][1]);
                const hour = this.props.time.hour

                let PMStart = false
                let AMEnd = false

                if (start > 12) { PMStart = true }
                if (end < 13) { AMEnd = true }


                if (PMStart && AMEnd) {
                    if (Number(hour) < 13) {
                        return Number(hour) < end &&
                            element.activeMonths.northern.some(item => item.month === Number(this.props.time.month + 1))
                    } else {
                        return Number(hour) >= start &&
                            element.activeMonths.northern.some(item => item.month === Number(this.props.time.month + 1))
                    }
                } else {
                    return start < Number(hour) && Number(hour) < end &&
                        element.activeMonths.northern.some(item => item.month === Number(this.props.time.month + 1))
                }
            })
            return (this.setState({ arr: arr }))
        }
    }

    componentDidMount() {
        if (this.props.bugs) {
            this.setState({ arr: BugTable })
            this.hourMonthFilter(BugTable)
        } else if (this.props.fish) {
            this.setState({ arr: FishTable })
            this.hourMonthFilter(FishTable)
        } else if (this.props.sea) {
            this.setState({ arr: SeaTable })
            this.hourMonthFilter(SeaTable)
        }
    }

    render() {
        const arr = this.state.arr
        if (this.props.bugs) {
            return (
                <div className="tablebox">
                    <div className="buttonbox">
                        <Buttons
                            name={this.props.bugs}
                            sortName={this.sortName.bind(this, arr)} />
                        <Buttons
                            name={this.props.bugs}
                            sortPrice={this.sortPrice.bind(this, arr)} />
                        <Buttons
                            name={this.props.bugs}
                            clearTable={this.clearTable.bind(this, arr)} />
                        <Buttons
                            name={this.props.bugs}
                            monthFilter={this.monthFilter.bind(this, BugTable)} />
                        <Buttons
                            name={this.props.bugs}
                            hourFilter={this.hourFilter.bind(this, BugTable)} />
                        <Buttons
                            name={this.props.bugs}
                            hourMonthFilter={this.hourMonthFilter.bind(this, BugTable)} />
                    </div>
                    <div className="tableHeader bugs">
                        <div>Name</div>
                        <div>Image</div>
                        <div>Price</div>
                        <div>Location</div>
                        <div>Time</div>
                    </div>
                    {arr.map(bugs => (
                        <div className="gridTable bugs" key={bugs[0]}>
                            <div>{bugs[0]}</div>
                            <div className="image" style={{ backgroundImage: 'url(' + bugs[1] + ')' }}></div>
                            <div>{bugs[2]}</div>
                            <div>{bugs[3]}</div>
                            <div>{bugs[4]}</div>
                        </div>
                    ))}
                </div>
            )
        } else if (this.props.fish) {
            return (
                <div className="tablebox">
                    <div className="buttonbox">
                        <Buttons
                            name={this.props.fish}
                            sortName={this.sortName.bind(this, arr)} />
                        <Buttons
                            name={this.props.fish}
                            sortPrice={this.sortPrice.bind(this, arr)} />
                        <Buttons
                            name={this.props.fish}
                            clearTable={this.clearTable.bind(this, arr)} />
                        <Buttons
                            name={this.props.fish}
                            monthFilter={this.monthFilter.bind(this, FishTable)} />
                        <Buttons
                            name={this.props.fish}
                            hourFilter={this.hourFilter.bind(this, FishTable)} />
                        <Buttons
                            name={this.props.fish}
                            hourMonthFilter={this.hourMonthFilter.bind(this, FishTable)} />
                    </div>
                    <div className="tableHeader fish">
                        <div>Name</div>
                        <div>Image</div>
                        <div>Price</div>
                        <div>Location</div>
                        <div>Shadow</div>
                        <div>Time</div>
                    </div>
                    {arr.map(fish => (
                        <div className="gridTable fish" key={fish[0]}>
                            <div>{fish[0]}</div>
                            <div className="image" style={{ backgroundImage: 'url(' + fish[1] + ')' }}></div>
                            <div>{fish[2]}</div>
                            <div>{fish[3]}</div>
                            <div>{fish[4]}</div>
                            <div>{fish[5]}</div>
                        </div>
                    ))}
                </div>
            )
        } else if (this.props.sea) {
            return (
                <div className="tablebox">
                    <div className="buttonbox">
                        <Buttons
                            name={this.props.sea}
                            sortName={this.sortName.bind(this, arr)} />
                        <Buttons
                            name={this.props.sea}
                            sortPrice={this.sortPrice.bind(this, arr)} />
                        <Buttons
                            name={this.props.sea}
                            clearTable={this.clearTable.bind(this, arr)} />
                        <Buttons
                            name={this.props.sea}
                            monthFilter={this.monthFilter.bind(this, SeaTable)} />
                        <Buttons
                            name={this.props.sea}
                            hourFilter={this.hourFilter.bind(this, SeaTable)} />
                        <Buttons
                            name={this.props.sea}
                            hourMonthFilter={this.hourMonthFilter.bind(this, SeaTable)} />
                    </div>
                    <div className="tableHeader sea">
                        <div>Name</div>
                        <div>Image</div>
                        <div>Price</div>
                        <div>Time</div>
                    </div>
                    {arr.map(sea => (
                        <div className="gridTable sea" key={sea.name}>
                            <div>{this.uppercaseFirstLetter(sea.name)}</div>
                            <div className="image" style={{ backgroundImage: 'url(' + sea.iconImage + ')' }}></div>
                            <div>{sea.sell}</div>
                            <div>{this.convertTime(sea.activeMonths.northern[0])}</div>
                        </div>
                    ))}
                </div>
            )
        }
    }
};

export default Tablebox;