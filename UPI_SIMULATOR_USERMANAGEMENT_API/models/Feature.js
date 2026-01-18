
const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  featureId: String,
  featureName: String
});

module.exports = mongoose.model("Feature", FeatureSchema);
