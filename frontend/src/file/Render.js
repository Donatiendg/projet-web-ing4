import React, {Component} from "react";
import ApexChart from "./Chart";

class AutoLayoutSizingExample extends Component {
    render(){
        return (
            <div className="container">
                <div className="sub-container">
                    <div className="basicColor">
                        pseudo : {this.props.pseudo}
                    </div>
                    <div className="basicColor">
                        rank : {this.props.rank}
                    </div>
                    <div className="basicColor">
                        tier : {this.props.tier}
                    </div>
                    <div className="basicColor">
                        wins : {this.props.wins}
                    </div>
                    <div className="basicColor">
                        losses : {this.props.losses}
                    </div>
                    <div className="basicColor">
                        lvl : {this.props.lvl}
                    </div>
                </div>
                <ApexChart wins={this.props.wins} looses={this.props.losses}/>
            </div>
        );
    }
}

export default AutoLayoutSizingExample;