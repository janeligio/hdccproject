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
      		 the island, even spanning across the neighbor islands.
      		 The IT department can become busy with calls not just within the office,
      		 but also from the other job sites. It is easy to troubleshoot users' problems
      		 in the office, but offsite, it is easier to have documentation
      		 of the configuration of the network setup in that location.
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
      	<Answer content={`
      		I will be utilizing my experience as a full-stack web developer to create an inventory-management system
      		and documentation for this task. Through this, I will also learn more about
      		development as any experience is a chance for me to enhance my abilities.

      	`}/>
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
      	<Answer content={`
      		I have proposed to create an full-stack application that uses a cloud-based database to 
      		store information, a back-end server to handle requests to the database, and a client-side
      		interface to easily interact with the data.
      		`}/>
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
      	<Answer content={
      		<div>
      			<ul>
      				<li>First week of July: Finish up back-end server</li>
      				<li>Second week of July: Start on front-end interface</li>
      				<li>Third week of July: Connect front-end with back-end</li>
      				<li>Fourth week of July: Prepare for presentation/Finish</li>
      			</ul>
      		</div>
      	}/>
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
      	<Answer content={
      	 	<div>
      	 	<ol>
      	 	<li>I was able to work with my supervisor to understand the requirements of the general
      	 		problem
      	 		</li>
      	 	<li>To meet the requirements, I made sure what was possible and what wasn't possible
      	 		in terms of building the application</li>
      	 	<li>I was given leeway to make whatever I wanted as long as the problem was solved.
      	 		I opted to create a useful application with persisting data and user-friendly interface.
      	 		</li>
      	 	<li>There were many moving parts in the software development lifecycle. 40% of the work I had to do
      	 		was programming, the other 60% was researching how to make the application work.
      	 	</li>	
      	 	</ol>
      		</div>}/>
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
      	<Answer content={`
      		I was able to complete the application, not without various difficulties.
      		The design is very minimal, modern, and clean. As someone who does not really
      		pride themselves in their design skills, the look, feel, and easy-of-use is
      		something that I, personally, can be proud of. The application can be pretty useful
      		for documentation. My supervisor can now better assist the various job sites with their
      			networking issues.
      		`}/>
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
      	<Answer content="
      		One challenge was to think of how I wanted to solve the solution. The big general
      		task at hand was documentation. There were many ways about going about doing so. 
      		However, the obvious ones such as simply creating an spreadsheet or creating a database
      		seemed unmotivated and unambitious. So I had to identify how exactly I wanted to go
      		about successfully documenting the data. The success came upon finishing the build
      		of the application. I could have only deemed it success had it been finished. As such, it was.
      	"/>
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
      	<Answer content="
      		I geared this project to something that I personally wanted to do. 
      		My position is more related to IT work, however I made it to something
      		where I had the chance to program and develop software. I could have been
      		swayed to maybe pursuing a more IT related field, but I seem to still be
      		on course to be some sort of programmer.
      	"/>
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
      <div style={{backgroundColor:'#DCDCDC	', 
      	padding:'1em',
      	border:'none',
      	borderRadius:'10px'}}>
      {content}
      </div>
      </Typography>
);

export default KOIP;