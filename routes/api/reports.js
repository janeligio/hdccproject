const express = require('express');
const router = express.Router();
const _ = require('lodash');
// Models
const Report = require('../../models/Report').Report;
const Equipment = require('../../models/Report').Equipment;
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const json2csv = require('json2csv').parse;
const moment = require('moment');
const path = require('path');
var csv = require('csv-express')

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

// @route GET api/reports/download/all
// @desc Download CSV file of all reports
// @access Public
router.get('/download/all', (req, res) => {
	function flattenObjectToString(obj) {
		let equipmentName = `${obj.equipmentName}:\n`;
		let brand = `Brand: ${obj.brand}\n`;
		let model = `Model: ${obj.model}\n`;
		let description = `Description: ${obj.description}\n`;
		let location = `Location: ${obj.location}\n`;
		let notes = `Notes: ${obj.notes}\n`;
		const allFields 
			= equipmentName + brand + model + description + location + notes;	
		return allFields;
	}
	function flattenArrayOfObjectsToString(arr) {
		if(arr.length > 0) {
			let retVal = '';
			_.forEach(arr, (obj) => retVal +=flattenObjectToString(obj));
			return retVal;
		} else {
			return 'none';
		}

	}
	Report
		.find().lean()
		.then(allReports => {
			const data = _.map(allReports, (report) => {
				const reportPtr = report;
				reportPtr.modem = flattenObjectToString(report.modem);
				reportPtr.router = flattenObjectToString(report.router);
				reportPtr.wirelessRouters = flattenArrayOfObjectsToString(report.wirelessRouters);
				reportPtr.switches = flattenArrayOfObjectsToString(report.switches);
				reportPtr.date = moment(report.date).format("MM/DD/YYYY, h:mm a, dddd");
				if(typeof report.lastUpdated !== 'undefined'){
					reportPtr.lastUpdated = moment(report.lastUpdated).format("MM/DD/YYYY, h:mm a, dddd");
				} else {
					reportPtr.lastUpdated = "";
				}
				return reportPtr;
			});
			const filename = 'reports.csv';
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/csv');
			res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
			try {
				res.csv(_.sortBy(data, o => o.name), true);
			} catch (err) {
				res.status(500).json({success:false});
			}
		})
		.catch(err => res.status(404).json({success: false}));
});

// @route GET api/reports/download/:id
// @desc Find a specific report by id
	Report// @access public
router.get('/download/:id', (req, res) => {
	Report
		.findById(req.params.id)
		.then(report => {
			console.log('hey');
			const reportPtr = report;
			reportPtr.modem = flattenObjectToString(report.modem);
			reportPtr.router = flattenObjectToString(report.router);
			reportPtr.wirelessRouters = flattenArrayOfObjectsToString(report.wirelessRouters);
			reportPtr.switches = flattenArrayOfObjectsToString(report.switches);

			const filename = `${report.name}-report#${req.params.id}`;
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/csv');
			res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
			let data = [];
			data.push(reportPtr);
			try {
				res.csv(data, true);
			} catch (err) {
				res.status(500).json({success:false});
			}		
		})
		.catch(err => { 			
			console.log('bad');
			res.status(404).json({success: false})
		});
});

// @route POST api/reports/create
// @desc Put report into database
// @access Private
router.post('/create', (req, res) => {
	const newModem = new Equipment(req.body.modem);
	const newRouter = new Equipment(req.body.router);
	const newWirelessRouters = 
		req.body.wirelessRouters.length !== 0 
		? _.map(req.body.wirelessRouters, 
			router => (new Equipment(router)))
		: [];
	const newSwitches = 
		req.body.switches.length !== 0
		? _.map(req.body.switches, 
			switchInstance => (new Equipment(switchInstance)))
		: [];

	const newReport = new Report({
		name: req.body.name,
		date: req.body.date,
		lastUpdated: null,
		circuitID: req.body.circuitID,
		connectionType: req.body.connectionType,
		active: true,
		subnet: req.body.subnet,
		internalIP: req.body.internalIP,
		externalIP: req.body.externalIP,
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
router.post('/edit/:reportId', (req, res) => {
	// Find report in database
	const { reportId } = req.params;
	
	const updatedReport = req.body;
	try {
		Report
			.update(
				{_id: reportId},
				{ $set: {
					name: updatedReport.name,
					date: updatedReport.date,
					lastUpdated: updatedReport.lastUpdated,
					circuitID: updatedReport.circuitID,
					connectionType: updatedReport.connectionType,
					active: updatedReport.active,
					subnet: updatedReport.subnet,
					internalIP: updatedReport.internalIP,
					externalIP: updatedReport.externalIP,
					modem: updatedReport.modem,
					router: updatedReport.router,
					wirelessRouters: updatedReport.wirelessRouters,
					switches: updatedReport.switches,				
					} 
				},
				null,
				(err, docs) => {
					console.log(`Successfully Document #${reportId}`);
					res.json({success:true});
				}
			);
	} catch (err) {
		res.json({success:false});
	}

});
// @route POST api/reports/edit/makeactive/:id
// @desc Update a report
// @access private
router.post('/edit/makeactive/:reportId', (req, res) => {
	const { reportId } = req.params;
	const active = req.body.active === 'active' ? true : false;

	try {
		Report.updateOne({_id:reportId}, {$set: {active:active} });
	} catch (err) {
		res.json({success:false});
	}

});

// @route DELETE api/reports/delete
// @desc Put reports into database
// @access private
router.delete('/delete', (req, res) => {
	console.log(req.query.id);
	Report.findById(req.query.id)
		.then(report => report
							.remove()
							.then(() => res.json({success: true}))
							.catch(err => res.status(404).json({success: false})));

});

module.exports = router;