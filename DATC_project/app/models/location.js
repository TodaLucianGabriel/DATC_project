import mongoose from "mongoose";
const { Schema } = mongoose;

var LocationSchema = new Schema({
  id: { type: Number },
  position: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Location", LocationSchema);
