import React from 'react';
import moment from 'moment';

const JobSite = (props) => {
  console.log(props.data);
  const wirelessRouters = props.data.wirelessRouters.map((router) => {
    return <Equipment key={router._id} data={router} />
  }); 
  const switches = props.data.switches.map((switchInstance) => {
    return <Equipment key={switchInstance._id} data={switchInstance} />
  }); 
  return(
    <div className="jobsite">
      <h1>{props.data.name}</h1>
    <p><b>Report created:</b> {moment(props.data.date).format("dddd, MMMM Do YYYY, hA")}</p>
      <p>Circuit ID:{props.data.circuitID}</p>
      <h3>Equipment</h3>
      <Equipment data={props.data.modem} />
      <Equipment data={props.data.router} />
      { wirelessRouters }
      { switches }
      <button className="btn edit">Edit</button>
    </div>
    );
};

const Equipment = (props) => {
  console.log(props);
  const { data } = props;
  return ( 
    <div>
      <h4>{data.equipmentName}: {data.brand} {data.model}</h4>
      <p>Description: {data.description}</p>
      <p>Location: {data.location}</p>
      <p>Notes: {data.notes}</p>
    </div>
  );
};
export default JobSite;