import React, {Component} from "react";
import ApexChart from "./Chart";

class AutoLayoutSizingExample extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="sub-container row">
                        <div className="basicColor col-10 col-sm-10 col-md-4 col-lg-3 col-xl-2">
                            pseudo : {this.props.pseudo}
                        </div>
                        <div className="basicColor col-10 col-sm-10 col-md-4 col-lg-3 col-xl-1">
                            rank : {this.props.rank}
                        </div>
                        <div className="basicColor col-10 col-sm-10 col-md-4 col-lg-3 col-xl-2">
                            tier : {this.props.tier}
                        </div>
                        <div className="basicColor col-10 col-sm-10 col-md-4 col-lg-3 col-xl-2">
                            wins : {this.props.wins}
                        </div>
                        <div className="basicColor col-10 col-sm-10 col-md-4 col-lg-3 col-xl-2">
                            losses : {this.props.losses}
                        </div>
                        <div className="basicColor col-10 col-sm-10 col-md-4 col-lg-3 col-xl-2">
                            lvl : {this.props.lvl}
                        </div>
                    </div>
                </div>
                <div className="chartEmblemContainer row">
                    <div className="chart col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <ApexChart wins={this.props.wins} looses={this.props.losses}/>
                    </div>
                    <div className="emblem col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <img src={`./image/emblem_${this.props.tier}.png`} alt=""></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default AutoLayoutSizingExample;