import React, {Component} from "react";
const API_URL_GET_CHAMPION_IMAGE = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

class ChampionBox extends Component{

    fct2(nom){
        return `url("${API_URL_GET_CHAMPION_IMAGE}${nom}_0.jpg")`;
    }

    fct3(value){
        if(value)
            return "championCard win";
        else
            return "championCard loose";
    }

    fct(){
        return (
            this.props.data.map((el, index) => {
                return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2">
                        <div key={index.toString()} className={this.fct3(el[4])} style={{backgroundImage: this.fct2(el[0])}}>
                            <div className="infosChampionCard">
                                <div className="infoChampionCard">champion : {el[0]}</div>
                                <div className="infoChampionCard">kills : {el[1]}</div>
                                <div className="infoChampionCard">death : {el[2]}</div>
                                <div className="infoChampionCard">assists : {el[3]}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        )

    }

    render() {
        return(
            <div className="row section">
                <h2>Statistiques des 6 dernières game jouées</h2>
                {this.fct()}
            </div>
        )
    }
}

export default ChampionBox;