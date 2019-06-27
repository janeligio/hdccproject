const express = require('express');
const router = express.Router();

// Report model
const Report = require('../../models/Report');

// @route GET api/reports
// @desc Get all reports
// @access Public
router.get('/', (req, res) => {
	console.log(Report.find());
	Report
		.find() // Get all report documents
		.then(reports => res.json(reports));
});

// @route GET api/reports/:id
// @desc Find a specific report by id
// @access public
router.get('/find', (req, res) => {
	Report
		.findById(req.query.id)
		.then(report => res.json(report))
		.catch(err => res.status(404).json({success: false}));
});



// @route POST api/reports
// @desc Put repot into database
// @access Private
router.post('/create', (req, res) => {
	const newReport = new Report({
		name: req.body.name || '',
		//date: Date.now || '',
		circuitID: req.body.circuitID || '',
		modem: {},
		router: {},
		wirelessRouters: {},
		switches: {},
	})

	newReport
		.save()
		.then(report => res.json(report));
});

// @route POST api/reports/:id
// @desc Update a report
// @access private
router.post('/edit', (req, res) => {
	// Find report in database
	const filter = req.query.id;
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