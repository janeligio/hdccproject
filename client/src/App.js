import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import './App.css';

import JobSites from './components/JobSites/JobSites';
import CreateReport from './components/CreateReport/CreateReport';
import SpecificJobSite from './components/SpecificJobSite/SpecificJobSite';

import Navigation from './components/Navigation/Navigation';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';

import SideBar from './components/SideBar/SideBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsites: []
    };
  }
  componentDidMount() {
      axios
        .get('/api/reports')
        .then(res => this.setState({jobsites: res.data}))
        .catch(err => console.log(err));
  }
  render() {

     return ( 
      <Router>
      <SideBar sites={this.state.jobsites}/>
      <div style={{marginLeft: '20%'}}>
        <Route exact path="/" component={JobSites} />
        <Route exact path="/create" component={CreateReport} />
        <Route exact path="/site/:id" component={SpecificJobSite} />
      </div>
      </Router>
    );
  }
}

/*
    <Router>
      <Header />
      <SideBar />
      <Navigation />
      <div className="App">
        <Route exact path="/" component={JobSites} />
        <Route exact path="/create" component={CreateReport} />
      </div>
    </Router>
*/

const Header = (props) => (
  <header className="header">
    <Link to="/"><h2>HDCC Job Sites</h2></Link>
    <Link to="/create">Create Report</Link>
  </header>
);




export default App;
