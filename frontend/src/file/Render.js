import React, {Component} from "react";
import ApexChart from "./Chart";

class AutoLayoutSizingExample extends Component {
    render() {
        return (
            <div className="row section">
                <h2>Information du joueur</h2>
                <div className="container col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                    <div className="sub-container row">
                        <h3>Statistique saison</h3>
                        <div className="basicColor col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
                            {this.props.pseudo}
                        </div>
                        <img src={`./profileicon/${this.props.profileIconId}.png`} alt=""></img>
                        <div className="basicColor col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
                            lvl : {this.props.lvl}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="emblem">
                        <h3>{this.props.tier} {this.props.rank}</h3>
                        <img src={`./image/emblem_${this.props.tier}.png`} alt=""></img>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="chartEmblemContainer row">
                        <div className="chart">
                            <ApexChart wins={this.props.wins} looses={this.props.losses}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default AutoLayoutSizingExample;