import React, {Component} from "react";
import ApexChart from "./Chart";

class AutoLayoutSizingExample extends Component {
    render() {
        return (
            <div className="row section">
                <h2>Information du joueur</h2>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4">
                    <div className="emblem">
                        <h3>{this.props.tier} {this.props.rank}</h3>
                        <img className="emblemImg" src={`./image/emblem_${this.props.tier}.png`} alt=""></img>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 ">
                    <div className="sub-container row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-5 col-xl-5">
                            <div>
                                <img className="profilIconImg" src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${this.props.profileIconId}.png`}
                                     alt=""></img>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-7 col-xl-7">
                            <div className="pseudo">
                                {this.props.pseudo}
                            </div>
                            <div className="level">
                                {this.props.lvl}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4">
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