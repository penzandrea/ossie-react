import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        fetch('http://localhost:3000/projects/419/issues').then(results => { return results.json();}).then(data => {
           let pictures = data.issues.map((pic) => {
               return(
                   <div>pic</div>
               )
           })
            this.setState({data: pictures});
            console.log(data);
        })

    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          {this.state.data}

      </div>
    );
  }
}

export default App;
