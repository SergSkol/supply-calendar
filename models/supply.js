const mongoose = require('mongoose');

const supplySchema = new mongoose.Schema({
  title: {type: String, required: true},
  country: {type: String, required: false},
  steps: [{type: Date, required: false}],
  status: {type: String, required: false}
});

const Supply = mongoose.model('Supply', supplySchema);

module.exports = Supply;