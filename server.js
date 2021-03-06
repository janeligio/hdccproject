const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const reports = require('./routes/api/reports');

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: true}));

// configure database
const database = require('./config/keys').mongoURI;

// connect to database
mongoose
	.connect(database, {useNewUrlParser:true, dbName: "hdcc-jobsites"})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log(err));

// Use routes
app.use('/api/reports', reports);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));