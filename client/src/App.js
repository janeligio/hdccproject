import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import './App.css';

import LandingPage from './components/LandingPage/LandingPage';
import JobSites from './components/JobSites/JobSites';
import CreateReport from './components/CreateReport/CreateReport';
import SpecificJobSite from './components/SpecificJobSite/SpecificJobSite';
import EditReport from './components/EditReport/EditReport';
import JobSiteNetwork from './components/JobSiteNetwork/JobSiteNetwork';

import SideBar from './components/SideBar/SideBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsites: [],
    };
  }
   getDB = () => {
    axios
      .get('/api/reports')
      .then(res => this.setState({
        jobsites: _.orderBy(res.data, site => site.name.toLowerCase(), ['asc'])
        })
      )
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getDB(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  render() {
     const mainPageStyle = {
      marginLeft: '20%',
     }
     return ( 
      <Router>
      <SideBar data={{activePath: window.location.pathname}} sites={this.state.jobsites}/>
      <div style={mainPageStyle}>
        <Route exact path="/" render={(props) => <LandingPage jobsites={this.state.jobsites} {...props} /> } />
        <Route exact path="/all" render={(props) => <JobSites jobsites={this.state.jobsites} {...props}/>} />
        <Route exact path="/create" component={CreateReport} />
        <Route exact path="/network" render={(props) => <JobSiteNetwork {...props} jobsites={this.state.jobsites}/>} />
        <Route exact path="/site/:id" render={(props) => <SpecificJobSite {...props} jobsites={this.state.jobsites}/>} />
        <Route exact path="/edit/:id" render={(props) => <EditReport {...props}/> }/>
      </div>
      </Router>
    );
  }
}


export default App;
