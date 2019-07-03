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
        <Route path="/" component={JobSites} />
        <Route path="/create" component={CreateReport} />
      </div>
    </Router>
    );
  }
}



const Header = (props) => (
  <header className="header">
    <Link to="/"><h1>HDCC Job Sites</h1></Link>
    <Link to="/create">Create Report</Link>
  </header>
);

export default App;
