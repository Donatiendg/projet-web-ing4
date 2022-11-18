import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import axios from "axios";

//RGAPI-98a2d96f-8a91-48cd-b6e2-3831658bb16a

class Test extends Component {
    state = {
        name: "test"
    };

    handleChange = event => {
        this.setState({name: event.target.value});
    };

  render() {
      return(
          <form>
              <input type="text" onChange={this.handleChange}/>
              <button>{this.state.name}</button>
          </form>
      );
  }
}

class Forecast extends Component{
    constructor(props) {
        super(props);
        this.state = {
            forecast: null
        };
    }

    callAPI = name => {
        axios
            .get(`?qqefafe`)
            .then(({ data }) => {

            })
            .catch(console.error);
    };
}

function App() {
  return (
    <div className="App">
      <Test />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

export default App;
