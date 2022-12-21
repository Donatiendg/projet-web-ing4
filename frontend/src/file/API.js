import axios from "axios";

import
    React, {cloneElement, Component} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useEffect, useState} from 'react';

import {getOneUser, getAllUsers, newUser, deleteOneUser, newComment} from "./services/UserList";
import ChampionBox from "./ChampionBox";
import AutoLayoutSizingExample from "./Render";

import data from "bootstrap/js/src/dom/data";
import TableJoueurs from "./TableJoueurs";



const API_KEY = "RGAPI-68365174-d714-457d-9358-c5cb9a8b07c4";
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
    let res = await axios.get(`${API_URL_GET_LIST_MATCH}${puuid}/ids?start=0&count=100&api_key=${API_KEY}`).catch(console.error);
    return res.data;
}

async function api4(id_matche) {
    let res = await axios.get(`${API_URL_GET_Match}${id_matche}?api_key=${API_KEY}`).catch(console.error);
    return res.data;
}


class API extends Component {
    state = {
        name: null,
        name_display: "Rekkles",
        lvl: "100",
        rank: null,
        tier: "CHALLENGER",
        wins: 100,
        losses: 0,
        data_match: [],
        data_match1: [],
        data_match2: [],
        data_match3: [],
        champion_image: "Velkoz_0.jpg",
        profileIconId: "1",
        matchShow: "1",
        info_ami:[],
    };

    refreshUsers = event => 
    {
        // API thisApi = this;
        getAllUsers()
        .catch((error)=>
        {
            // if an error has occured, do something here
            //...
            console.log(error);
        })
        .then((info_ami)=>
        {
            console.log(info_ami);
            this.setState({info_ami: info_ami});
        });
    }

    onClick = event => {
        this.callAPI();
    };

    handleChange = event => {
        this.setState({name: event.target.value});
    };


    /*
        La fonction callAPI() est un peu la fonction principale de cette partie du projet.
        Elle permet de récupérer toutes les informations en appelant les différentes api.
     */
    async callAPI(){
        const summoners = await api1(this.state.name);
        const dataSummoners = await api2(summoners.id);
        const listIDMatches = await api3(summoners.puuid);
        this.setState({rank: dataSummoners.rank, tier: dataSummoners.tier, wins: dataSummoners.wins, losses: dataSummoners.losses, lvl: summoners.summonerLevel, profileIconId: summoners.profileIconId});
        this.setState({name_display: this.state.name});

        this.refreshUsers();


        /*
            On cherche les 6 derniers march joué par le joueur renseigné.
            On stoque ces data dans le state data_match et data_match1.
            On affiche par défaut ces data (en cas de changement on le garde en mémoire via le state data_match1.
         */
        let data;
        let tab1 = [];
        for (let i = 0; i < 6; i++) {
            data = await api4(listIDMatches[i]);
            for (let j = 0; j < 10; j++) {
                if(data.info.participants[j].summonerName === this.state.name){
                    tab1.push([data.info.participants[j].championName, data.info.participants[j].kills, data.info.participants[j].deaths, data.info.participants[j].assists, data.info.participants[j].win]);
                    break;
                }
            }
        }
        this.setState({data_match: tab1, data_match1: tab1});

        /*
            Cette partie prend plus de temps c'est pour ça qu'elle est distincte de la première.
            On vérifie parmi les 100 dernières parties (pour avoir un peu de marge) les parties de type "Classic"
            et "Aram".
            On ajoute tout de même une condition pour avorter la boucle dans le cas ou toute les données ont été trouvées.
        */
        let tab2 = [];
        let tab3 = [];
        for (let i = 0; i < 100; i++) {
            data = await api4(listIDMatches[i]);
            for (let j = 0; j < 10; j++) {
                if(data.info.participants[j].summonerName === this.state.name){
                    if (data.info.gameMode === "CLASSIC" && tab2.length < 6){
                        tab2.push([data.info.participants[j].championName, data.info.participants[j].kills, data.info.participants[j].deaths, data.info.participants[j].assists, data.info.participants[j].win]);
                        break;
                    }
                    else if(data.info.gameMode === "ARAM" && tab3.length < 6){
                        tab3.push([data.info.participants[j].championName, data.info.participants[j].kills, data.info.participants[j].deaths, data.info.participants[j].assists, data.info.participants[j].win]);
                        break;
                    }
                }
            }
            if(tab2.length > 5 && tab3.length > 5)
                break;
        }
        this.setState({data_match2: tab2, data_match3: tab3});
    }

    /*
        On change les data affichées par ChampionBox.
     */
    handleSelect = e => {
        this.setState({matchShow: e})
        if(e == 1)
            this.setState({data_match: this.state.data_match1});
        else if(e == 2)
            this.setState({data_match: this.state.data_match2});
        else if(e == 3)
            this.setState({data_match: this.state.data_match3});
    }


    /*
        On affiche une bonne partie des informations via ce render.
     */
    render() {
        return(
            <div>
                <h1>API League of legends</h1>
                <input className="inputName" placeholder="Entrez un pseudo" type="text" onChange={this.handleChange}/>
                <button onClick={this.refreshUsers}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                        <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                    </svg>
                </button>
                <button className="boutonR" onClick={this.onClick}>Rechercher</button>
                <AutoLayoutSizingExample pseudo={this.state.name_display} rank={this.state.rank} tier={this.state.tier} wins={this.state.wins} losses={this.state.losses} lvl={this.state.lvl} profileIconId={this.state.profileIconId}/>
                <div className="section">
                <h2>Statistiques des 6 dernières game jouées</h2>
                <DropdownButton variant="dark" className="dropDownMenu" menuVariant="dark" id="dropdown-basic-button" title="Sélectionnez un mode de jeu" onSelect={this.handleSelect}>
                    <Dropdown.Item eventKey={"1"}>All</Dropdown.Item>
                    <Dropdown.Item eventKey={"2"}>Normal</Dropdown.Item>
                    <Dropdown.Item eventKey={"3"}>Aram</Dropdown.Item>
                </DropdownButton>
                <ChampionBox data={this.state.data_match}/>
                </div>
                <TableJoueurs info_ami={this.state.info_ami}></TableJoueurs>
            </div>
        );
    }
      
}


export default API;
