const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
	equipmentName: {type: String, default: ''},
	brand: {type: String, default: ''},
	model: {type: String, default: ''},
	description: {type: String, default: ''},
	location: {type: String, default: ''},
	notes: {type: String, default: ''}, // Will hold notes on whether any ports are occupied
	pictures: {type: [String], default: []}, // Array of possible urls
});

const ReportSchema = new Schema({
	name: {type: String, default: ''},
	date: {
		type: Date,
		default: Date.now
	},
	circuitID: {type: String, default: ''},
	modem: EquipmentSchema,
	router: EquipmentSchema,
	wirelessRouters: [EquipmentSchema],
	switches: [EquipmentSchema], 
});

module.exports = {
	Equipment: mongoose.model('Equipment', EquipmentSchema),
	Report: mongoose.model('Report', ReportSchema)
}