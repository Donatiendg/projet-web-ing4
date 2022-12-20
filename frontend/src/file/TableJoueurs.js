import React, {Component} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

class TableJoueurs extends Component {

    render() {
        return (
            /*Table amis proche*/
            <div>
                <div className="row section">
                    <h2>Listes d'amis et blacklist</h2>
                    <input className="inputPseudo" placeholder="Entrez un pseudo" type="text"/>
                    <DropdownButton variant="dark" className="dropDownMenu" menuVariant="dark" id="dropdown-basic-button" title="Sélectionnez une liste">
                        <Dropdown.Item eventKey={"1"}>Amis proche</Dropdown.Item>
                        <Dropdown.Item eventKey={"2"}>Amis</Dropdown.Item>
                        <Dropdown.Item eventKey={"3"}>BlackList</Dropdown.Item>
                    </DropdownButton>
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
                    </div>
                </div>
            </div>


        )
    }

}

export default TableJoueurs;