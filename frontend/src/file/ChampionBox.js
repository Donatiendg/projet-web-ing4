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
                    <div className="basicColor" style={{backgroundImage: this.fct2(el[0])}}>
                        champion : {el[0]};
                        kills : {el[1]};
                        death : {el[2]};
                        assists : {el[3]};
                    </div>
                )
            })
        )

    }
    render() {
        return(
            <div>
                {this.fct()}
            </div>
        )
    }
}

export default ChampionBox;