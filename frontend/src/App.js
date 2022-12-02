import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import Chart from 'react-apexcharts';

const API_KEY = "RGAPI-0babe4f0-414f-4d09-b4f5-e90fcd5dc50f";
const API_URL_SUMMONERS = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const API_URL_ENTRIES = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/";
const API_URL_GET_LIST_MATCH = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/";
const API_URL_GET_Match = "https://europe.api.riotgames.com/lol/match/v5/matches/";
const API_URL_GET_CHAMPION_IMAGE = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Velkoz_0.jpg";

//Velkoz_0.jpg
class ApexChart extends React.Component {
    state = {
        wins: 100,
        looses: 50,
    }
    constructor(props) {
        super(props);
        this.state = {
            series: [this.props.wins, this.props.looses],
            options: {
                chart: {
                    type: 'pie',
                },
                labels: ['Loose', 'Win'],
                colors:['#ff0000', 'rgba(0,0,255,0.4)'],
                legend: {
                    show: false
                }
            },
        };
    }

    render() {
        console.log(this.props.wins)
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="pie" width={380} />
            </div>
        );
    }
}

async function api1(name){
    let res = await axios.get(`${API_URL_SUMMONERS}${name}?api_key=${API_KEY}`).catch(console.error);
    return res.data;
}

async function api2(id) {
    let res = await axios.get(`${API_URL_ENTRIES}${id}?api_key=${API_KEY}`).catch(console.error);
    return res.data[0];
}

async function api3(puuid) {
    let res = await axios.get(`${API_URL_GET_LIST_MATCH}${puuid}/ids?start=0&count=5&api_key=${API_KEY}`).catch(console.error);
    return res.data;
}

async function api4(id_matche) {
    let res = await axios.get(`${API_URL_GET_Match}${id_matche}?api_key=${API_KEY}`).catch(console.error);
    return res.data;
}

class Test extends Component {
    state = {
        name: "BlitzKay",
        lvl: null,
        rank: null,
        tier: null,
        wins: null,
        losses: null,
        matches_data: null,
        championName: null,
        kills: null,
        deaths: [],
        assists: null,
        champion_image: "Velkoz_0.jpg"
    };

    handleChange = event => {
        this.setState({name: event.target.value});
    };

    async onClick(){
        const summoners = await api1(this.state.name);
        const dataSummoners = await api2(summoners.id);
        const listIDMatches = await api3(summoners.puuid);
        this.setState({rank: dataSummoners.rank, tier: dataSummoners.tier, wins: dataSummoners.wins, losses: dataSummoners.losses, lvl: summoners.summonerLevel});
        let data;
        for (let i = 0; i < 5; i++) {
            data = await api4(listIDMatches[i]);
            for (let j = 0; j < 8; j++) {
                if(data.info.participants[j].summonerName == this.state.name){
                    console.log(data.info.participants[j].summonerName);
                    console.log(data.info.participants[j].championName);
                    console.log(data.info.participants[j].kills);
                    console.log(data.info.participants[j].deaths);
                    console.log(data.info.participants[j].assists);

                    break;
                }
            }
            //this.setState({championName: data.info.participants[j].championName, kills: data.info.participants[j].kills,
            //    deaths: data.info.participants[j].deaths, assists: data.info.participants[j].assists});
        }
    }

    render() {
      return(
          <form>
              <input type="text" onChange={this.handleChange}/>
              <button onClick={this.onClick()}>{this.state.name}</button>
              <AutoLayoutSizingExample pseudo={this.state.name} rank={this.state.rank} tier={this.state.tier} wins={this.state.wins} losses={this.state.losses} lvl={this.state.lvl}
              data={this.state.matches_data}/>
              Bonjour
          </form>
    );
    }
}

class ChampionBox extends Component{
    render() {
        return(
            <div>
                <div className="basicColor">
                    name : {this.props.data[0]};
                    death : {this.props.deaths};
                    kills : {this.props.kills};
                    assists : {this.props.assists};
                </div>
            </div>
            )
    }
}

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
                </div>
                <ApexChart wins={this.props.wins} looses={this.props.losses}/>
            </div>
        );
    }
}
function App() {
  return (
    <div className="App">
        <Test />
    </div>
  );
}

export default App;
