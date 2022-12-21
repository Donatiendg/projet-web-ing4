import React, {Component} from "react";
import {newUser} from "./services/UserList";



class TableJoueurs extends Component {

    initUser() 
    {
        // console.log(this.props.info_ami) //debug 
        return (this.props.info_ami.map((ami)=><tr><td key={ami._id}>{ami.name}</td></tr>))
    }

    createUser()
    {
        var name = document.getElementById('input_pseudo_id').value;
        newUser(name);
        
    }

    render() {
        return(
            
            <div className="row section">
                <div>
                    <div className="row section">
                        <h2>Listes d'amis</h2>
                        <input id="input_pseudo_id" className="inputPseudo" placeholder="Entrez un pseudo" type="text"/>
                        <button onClick={this.createUser}>Ajouter Ami</button>   
                        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                            <table className="table table-hover table-dark">
                                <thead>
                                <tr>
                                    <th colSpan="2">Mes amis</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.initUser()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default TableJoueurs;