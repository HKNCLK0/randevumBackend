import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
  businessID: String,
  tableName: String,
  tablePeopleCount: String,
  tableFeatures: Array,
});

const Table = mongoose.model("Tables", tableSchema);

export default Table;
