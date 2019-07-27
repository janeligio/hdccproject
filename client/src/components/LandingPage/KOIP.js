import React from 'react';
import Typography from '@material-ui/core/Typography';

const KOIP = () => (
	<div>
      <Typography style={{marginTop: '.5em'}} variant="h3">
        KOIP Summer Internship Program
      </Typography>
      <Section 
      	header={<Header content={`
        	Project Overview
      		`}/>
      	}
      	body={<Body content={`
			Identify a problem, challenge, or complex question to a current situation at your internship site that you will be focusing on for your project.  
      		`}/>
      	}
      	/>
      	<Answer content={`
      		The company has a main office as well as numerous job sites across 
      		 the island and even on the other islands.
      		 The IT department becomes very busy with calls not just within the office,
      		 but also the other job sites. It is easy to troubleshoot users' problems
      		 in the office, but offsite, it becomes more challenging as they need to
      		 know the configuration of the network setup in that location.
      		 To alleviate the problem, it would be beneficial to have some system
      		 to keep track of the inventory and setup of the network configuration in
      		 each job site.
      	`}/>
      <Section 
      	header={<Header content={`
        Education case 
      		`}/>
      	}
      	body={<Body content={`
			        Describe how the project you will be executing utilizes or enhances your academic knowledge or skills.  
      		`}/>
      	}
      	/>
      <Section 
      	header={<Header content={`
        Project Delivery 
      		`}/>
      	}
      	body={<Body content={`
			      	Proposed solution or clear statement that explains the project you will deliver.
      		`}/>
      	}
      	/>
      <Section 
      	header={<Header content={`
        Project Timeline
      		`}/>
      	}
      	body={<Body content={`
					Outline your projected timeline.
      		`}/>
      	}
      	/>
      <Section 
      	header={<Header content={`
        Project Objectives 
      		`}/>
      	}
      	body={<Body content={<div>
			During your internship experience, 
			you applied the following 21st Century skills. 
			In the evidence section below, please provide an 
			example of how you demonstrated each skill.
			<ol>
			<li>Communication: ability to understand and express 
			personal ideas in a professional setting</li>
			<li>Collaboration: ability to work with others</li>
			<li>Creativity/Innovation: ability to generate and suggest new ideas</li>
			<li>Critical Thinking: ability to work with others</li>
			</ol> 
			 </div>}/>
      	}
      	/>
      <Section 
      	header={<Header content={`
        Project Outcome
      		`}/>
      	}
      	body={<Body content={`
			What was the outcome of your project and what impact did your project have on your site? 
      		`}/>
      	}
      	/>
      <Section 
      	header={<Header content={`
        Project Challenge and Success
      		`}/>
      	}
      	body={<Body content={`
Identify one challenge and one success related to your project.
      		`}/>
      	}
      	/>
      <Section 
      	header={<Header content={`
        Project Influence on Future Decisions
      		`}/>
      	}
      	body={<Body content={`
			How will the results of your internship experience influence future decisions (e.g. personal, education, career, community, etc.)?    
      		`}/>
      	}
      	/>

	</div>
);
const Header = ({content}) => (
      <Typography style={{marginTop: '.5em'}} variant="h5">
        {content}
      </Typography>
);
const Body = ({content}) => (
 <Typography variant="subtitle1" gutterBottom>
	{content}
 </Typography>
);
const Section = ({header, body}) => (
	<div>
	{header}
	{body}
	</div>
);
const Answer = ({content}) => (
      <Typography variant="subtitle2" gutterBottom>
      <div style={{backgroundColor:'yellow', padding:'1em'}}>
      Answer:{content}
      </div>
      </Typography>
);

export default KOIP;