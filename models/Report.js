const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
	equipmentName: String,
	brand: String,
	model: String,
	description: String,
	location: String,
	notes: String, // Will hold notes on whether any ports are occupied
	pictures: [String], // Array of possible urls
});

const ReportSchema = new Schema({
	name: String,
	date: {
		type: Date,
		default: Date.now
	},
	circuitID: String,
	modem: EquipmentSchema,
	router: EquipmentSchema,
	wirelessRouters: [EquipmentSchema],
	switches: [EquipmentSchema], 
});


module.exports = Equipment = mongoose.model('Equipment', EquipmentSchema);
module.exports = Report = mongoose.model('Report', ReportSchema);