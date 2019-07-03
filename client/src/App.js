import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import './App.css';

import JobSites from './components/JobSites/JobSites';
import CreateReport from './components/CreateReport/CreateReport';


class App extends Component {
  
  render() {

    return (
    <Router>
      <Header />
      <div className="App">
        <Route exact path="/" component={JobSites} />
        <Route exact path="/create" component={CreateReport} />
      </div>
    </Router>
    );
  }
}



const Header = (props) => (
  <header className="header">
    <Link to="/"><h2>HDCC Job Sites</h2></Link>
    <Link to="/create">Create Report</Link>
  </header>
);

export default App;
