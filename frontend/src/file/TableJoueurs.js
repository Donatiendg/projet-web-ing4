import React, {Component} from "react";

class TableJoueurs extends Component {

    render() {
        return (
            /*Table amis proche*/
            <div>
                <div className="row section">
                    <h2>Listes d'amis et blacklist</h2>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <table className="table table-hover table-dark">
                            <thead>
                            <tr>
                                <th colspan="2">Mes amis proches</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Joueur1</td>
                                <td>Joueur2</td>
                            </tr>
                            </tbody>
                        </table>
                        <button className="bouttonAjouter">Ajouter un pseudo + </button>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <table className="table table-hover table-dark">
                            <thead>
                            <tr>
                                <th colSpan="2">Mes amis</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Joueur1</td>
                                <td>Joueur2</td>
                            </tr>
                            </tbody>
                        </table>
                        <button className="bouttonAjouter">Ajouter un pseudo + </button>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <table className="table table-hover table-dark">
                            <thead>
                            <tr>
                                <th colSpan="2">Ma blackList</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Joueur1</td>
                                <td>Joueur2</td>
                            </tr>
                            </tbody>
                        </table>
                        <button className="bouttonAjouter">Ajouter un pseudo + </button>
                    </div>

                </div>
            </div>


        )
    }

}

export default TableJoueurs;