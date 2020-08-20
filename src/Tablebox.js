import React from 'react';
// import Buttons from './Buttons';

function Tablebox(props){
    if(props.bugs){
        return(
            <div className="tablebox">
                {/* <Buttons
                    bugs={props.bugs}
                    sortName={props.sortName}/> */}
                <div className="tableHeader bugs">
                    <div>Name</div>
                    <div>Image</div>
                    <div>Price</div>
                    <div>Location</div>
                    <div>Time</div>
                </div>
                {props.bugs.map(bugs => (
                    <div className="gridTable bugs" key={bugs[0]}>
                        <div>{bugs[0]}</div>
                        <div className="image" style={{backgroundImage: 'url('+bugs[1]+')'}}></div>
                        <div>{bugs[2]}</div>
                        <div>{bugs[3]}</div>
                        <div>{bugs[4]}</div>
                    </div>
                ))}
            </div>
        )
    } else if (props.fish){
        return(
            <div className="tablebox">
                <div className="tableHeader fish">
                    <div>Name</div>
                    <div>Image</div>
                    <div>Price</div>
                    <div>Location</div>
                    <div>Shadow</div>
                    <div>Time</div>
                </div>
                {props.fish.map(fish => (
                    <div className="gridTable fish" key={fish[0]}>
                        <div>{fish[0]}</div>
                        <div className="image" style={{backgroundImage: 'url('+fish[1]+')'}}></div>
                        <div>{fish[2]}</div>
                        <div>{fish[3]}</div>
                        <div>{fish[4]}</div>
                        <div>{fish[5]}</div>
                    </div>
                ))}
            </div>
        )
    } else if (props.sea){
        return(
            <div className="tablebox">
                <div className="tableHeader sea">
                    <div>Name</div>
                    <div>Image</div>
                    <div>Price</div>
                    <div>Time</div>
                </div>
                {props.sea.map(sea => (
                    <div className="gridTable sea" key={sea.name}>
                        <div>{props.uppercaseFirstLetter(sea.name)}</div>
                        <div className="image" style={{backgroundImage: 'url('+sea.iconImage+')'}}></div>
                        <div>{sea.sell}</div>
                        <div>{props.convertTime(sea.activeMonths.northern[0])}</div>
                    </div>
                ))}
            </div>
        )
    }
};

export default Tablebox;