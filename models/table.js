const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
