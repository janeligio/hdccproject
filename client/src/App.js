import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import './App.css';

import LandingPage from './components/LandingPage/LandingPage';
import JobSites from './components/JobSites/JobSites';
import CreateReport from './components/CreateReport/CreateReport';
import SpecificJobSite from './components/SpecificJobSite/SpecificJobSite';
import EditReport from './components/EditReport/EditReport';
import JobSiteNetwork from './components/JobSiteNetwork/JobSiteNetwork';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';

import SideBar from './components/SideBar/SideBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsites: [],

    };
  }

  componentDidUpdate(prevProps){
    if(this.state.jobsites !== prevProps.jobsites){
      axios
        .get('/api/reports')
        .then(res => this.setState({jobsites: 
          _.orderBy(res.data, ['name'], ['asc'])}))
        .catch(err => console.log(err));
      }
  }
  componentDidMount() {
      axios
        .get('/api/reports')
        .then(res => this.setState({jobsites: 
          _.orderBy(res.data, ['name'], ['asc'])}, () => console.log(this.state)))
        .catch(err => console.log(err));
  }
  render() {

     return ( 
      <Router>
      <SideBar data={{activePath: window.location.pathname}} sites={this.state.jobsites}/>
      <div style={{marginLeft: '20%'}}>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/all" component={JobSites} />
        <Route exact path="/create" component={CreateReport} />
        <Route exact path="/network" render={(props) => <JobSiteNetwork {...props} sort={this.updateArrayOrder}jobsites={this.state.jobsites}/>} />
        <Route exact path="/site/:id" component={SpecificJobSite} />
        <Route exact path="/edit/:id" component={EditReport} />
      </div>
      </Router>
    );
  }
}


export default App;
