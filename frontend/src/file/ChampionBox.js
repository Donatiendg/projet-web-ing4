import React, {Component} from "react";
const API_URL_GET_CHAMPION_IMAGE = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

class ChampionBox extends Component{

    fct2(nom){
        return `url("${API_URL_GET_CHAMPION_IMAGE}${nom}_0.jpg")`;
    }

    fct(){
        return (
            this.props.data.map((el, index)=>{
                console.log("toto " + el);
                console.log(el);
                return(
                        <div className="championCard" style={{backgroundImage: this.fct2(el[0])}}>
                            <div className="infosChampionCard">
                                <div className="infoChampionCard">champion : {el[0]}</div>
                                <div className="infoChampionCard">kills : {el[1]}</div>
                                <div className="infoChampionCard">death : {el[2]}</div>
                                <div className="infoChampionCard">assists : {el[3]}</div>
                            </div>
                        </div>
                )
            })
        )

    }
    render() {
        return(
            <div className="championCards">
                {this.fct()}
            </div>
        )
    }
}

export default ChampionBox;