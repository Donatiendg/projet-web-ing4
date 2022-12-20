import
    React, {cloneElement, Component} from "react";
import axios from "axios";
import ChampionBox from "./ChampionBox";
import AutoLayoutSizingExample from "./Render";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import data from "bootstrap/js/src/dom/data";
import TableJoueurs from "./TableJoueurs";

const API_KEY = "RGAPI-be880b4e-a751-45fd-8f1e-bb8c55a0b2a8";
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

    };

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
                <TableJoueurs></TableJoueurs>
            </div>
        );
    }
}

export default API;