const express = require('express');
const router = express.Router();
const _ = require('lodash');
// Models
const Report = require('../../models/Report').Report;
const Equipment = require('../../models/Report').Equipment;

// @route GET api/reports
// @desc Get all reports
// @access Public
router.get('/', (req, res) => {
	Report
		.find() // Get all report documents
		.then(reports => res.json(reports));
});

// @route GET api/reports/:id
// @desc Find a specific report by id
// @access public
router.get('/find/:id', (req, res) => {
	Report
		.findById(req.params.id)
		.then(report => res.json(report))
		.catch(err => res.status(404).json({success: false}));
});



// @route POST api/reports/create
// @desc Put repot into database
// @access Private
router.post('/create', (req, res) => {
	const newModem = new Equipment(req.body.modem);
	const newRouter = new Equipment(req.body.router);
	const newWirelessRouters = 
		req.body.wirelessRouters.length != 0 
		? _.map(req.body.wirelessRouters, 
			router => (new Equipment(router)))
		: [];
	const newSwitches = 
		req.body.switches.length != 0
		? _.map(req.body.switches, 
			switchInstance => (new Equipment(switchInstance)))
		: [];

	const newReport = new Report({
		name: req.body.name,
		date: req.body.date,
		circuitID: req.body.circuitID,
		modem: newModem,
		router: newRouter,
		wirelessRouters: newWirelessRouters,
		switches: newSwitches,
	})
	newReport
		.save()
		.then(report => res.json(report));
});

// @route POST api/reports/edit:id
// @desc Update a report
// @access private
router.post('/edit', (req, res) => {
	// Find report in database
	console.log(res.query);
	console.log(res.params);
	const filter = req.query.id;
	console.log(filter);
	const updatedDoc = req.body;
	Report
		.updateOne(
			{_id: filter},
			{ $set: updatedDoc }
			)
		.then(report => res.json(report))
		.catch(err => res.status(404).json({success:false}));
});

// @route DELETE api/reports/delete
// @desc Put reports into database
// @access private
router.delete('/delete', (req, res) => {
	Report.findById(req.query.id)
		.then(report => report
							.remove()
							.then(() => res.json({success: true}))
							.catch(err => res.status(404).json({success: false})));

});

module.exports = router;