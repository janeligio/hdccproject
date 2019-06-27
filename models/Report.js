const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
	equipmentName: String,
	brand: String,
	model: String,
	description: String,
	location: String,
	incomingPort: String,
	outgoingPort: String,
	printerPort: String,
	serverPort: String,
	otherPort: String
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


module.exports = Report = mongoose.model('Report', ReportSchema);