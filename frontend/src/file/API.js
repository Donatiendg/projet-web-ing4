import React, {cloneElement, Component} from "react";
import axios from "axios";
import ChampionBox from "./ChampionBox";
import AutoLayoutSizingExample from "./Render";

const API_KEY = "RGAPI-59c4f085-fe87-4321-8f5a-7c47990436d4";
const API_URL_SUMMONERS = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const API_URL_ENTRIES = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/";
const API_URL_GET_LIST_MATCH = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/";
const API_URL_GET_Match = "https://europe.api.riotgames.com/lol/match/v5/matches/";

async function api1(name){
    let res = await axios.get(`${API_URL_SUMMONERS}${name}?api_key=${API_KEY}`).catch(console.error);
    return res.data;
}

async function api2(id) {
    let res = await axios.get(`${API_URL_ENTRIES}${id}?api_key=${API_KEY}`).catch(console.error);
    return res.data[0];
}

async function api3(puuid) {
    let res = await axios.get(`${API_URL_GET_LIST_MATCH}${puuid}/ids?start=0&count=6&api_key=${API_KEY}`).catch(console.error);
    return res.data;
}

async function api4(id_matche) {
    let res = await axios.get(`${API_URL_GET_Match}${id_matche}?api_key=${API_KEY}`).catch(console.error);
    return res.data;
}

class API extends Component {
    state = {
        name: null,
        name_display: null,
        lvl: null,
        rank: null,
        tier: null,
        wins: 100,
        losses: 0,
        data_match: [],
        champion_image: "Velkoz_0.jpg"
    };

    onClick = event => {
        this.callAPI();
    };

    handleChange = event => {
        this.setState({name: event.target.value});
    };

    async callAPI(){
        const summoners = await api1(this.state.name);
        const dataSummoners = await api2(summoners.id);
        const listIDMatches = await api3(summoners.puuid);
        this.setState({rank: dataSummoners.rank, tier: dataSummoners.tier, wins: dataSummoners.wins, losses: dataSummoners.losses, lvl: summoners.summonerLevel});
        this.setState({name_display: this.state.name});
        let data;
        let tab = [];
        for (let i = 0; i < 6; i++) {
            data = await api4(listIDMatches[i]);
            for (let j = 0; j < 10; j++) {
                if(data.info.participants[j].summonerName === this.state.name){
                    tab.push([data.info.participants[j].championName, data.info.participants[j].kills, data.info.participants[j].deaths, data.info.participants[j].assists, data.info.participants[j].win]);
                    break;
                }
            }
            this.setState({data_match: tab});
        }
    }

    render() {
        return(
            <div>
                <h1>API League of legends</h1>
                <input className="inputName" placeholder="Entrez un pseudo" type="text" onChange={this.handleChange}/>
                <button className="boutonR" onClick={this.onClick}>Rechercher</button>
                <AutoLayoutSizingExample pseudo={this.state.name_display} rank={this.state.rank} tier={this.state.tier} wins={this.state.wins} losses={this.state.losses} lvl={this.state.lvl}/>
                <ChampionBox data={this.state.data_match}/>
            </div>
        );
    }
}

export default API;