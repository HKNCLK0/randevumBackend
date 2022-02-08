import mongoose from "mongoose";

const panelSchema = mongoose.Schema({
  panelTitle: String,
  panelURL: String,
  panelAccess: String,
});

const Panel = mongoose.model("Panel", panelSchema);

export default Panel;
