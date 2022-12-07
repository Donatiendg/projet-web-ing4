import React, {Component} from "react";
import axios from "axios";
import ChampionBox from "./ChampionBox";
import AutoLayoutSizingExample from "./Render";

const API_KEY = "RGAPI-f68895a7-1a1d-4473-ac72-cadd2483d859";
const API_URL_SUMMONERS = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const API_URL_ENTRIES = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/";
const API_URL_GET_LIST_MATCH = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/";
const API_URL_GET_Match = "https://europe.api.riotgames.com/lol/match/v5/matches/";

//Velkoz_0.jpg


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

class API extends Component {
    state = {
        name: "BlitzKay",
        lvl: null,
        rank: null,
        tier: null,
        wins: 100,
        losses: 0,
        data_match: [],
        champion_image: "Velkoz_0.jpg"
    };

    handleChange = event => {
        this.setState({name: event.target.value});
    };

    onClick(){
        this.callAPI();
    }

    async callAPI(){
        const summoners = await api1(this.state.name);
        const dataSummoners = await api2(summoners.id);
        const listIDMatches = await api3(summoners.puuid);
        this.setState({rank: dataSummoners.rank, tier: dataSummoners.tier, wins: dataSummoners.wins, losses: dataSummoners.losses, lvl: summoners.summonerLevel});
        let data;
        let tab = [];
        for (let i = 0; i < 5; i++) {
            data = await api4(listIDMatches[i]);
            for (let j = 0; j < 8; j++) {
                if(data.info.participants[j].summonerName == this.state.name){
                    tab.push([data.info.participants[j].championName, data.info.participants[j].kills, data.info.participants[j].deaths, data.info.participants[j].assists]);
                    break;
                }
            }
            this.setState({data_match: tab});
        }
    }

    render() {
        return(
            <form>
                <input type="text" onChange={this.handleChange}/>
                <button onClick={this.onClick()}>{this.state.name}</button>
                <AutoLayoutSizingExample pseudo={this.state.name} rank={this.state.rank} tier={this.state.tier} wins={this.state.wins} losses={this.state.losses} lvl={this.state.lvl}/>
                <ChampionBox data={this.state.data_match}/>
            </form>
        );
    }
}

export default API;