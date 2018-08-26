const Mongoose = require('mongoose');
const ModelUtils = require('./model-utils');

const processNames = ['VALIDATING', 'LINKING', 'IMPACT_FETCHING'];
const statuses = ['PENDING'];

let validationSchemaObject = {
  _campaignId: {
    type: Mongoose.Schema.ObjectId,
    ref: 'Campaign'
  },
  _outcomeId: {
    type: Mongoose.Schema.ObjectId,
    ref: 'Outcome'
  },
  _userId: {
    type: Mongoose.Schema.ObjectId,
    ref: 'User'
  },
  amount: Number,

  crypto: String,
  createdAt: Date,
  status: {
    type: String,
    enum: ModelUtils.evaluateStatuses(processNames, statuses)
  }
};

ModelUtils.addDateFields(processNames, validationSchemaObject);
ModelUtils.addTxFields(processNames, validationSchemaObject);

const ValidationSchema = new Mongoose.Schema(validationSchemaObject);

module.exports = Mongoose.model('Validation', ValidationSchema);