import mongoose from "mongoose";
const { Schema, model } = mongoose;

const linkSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: String,
  views: { type: Number, default: 0 },
});
const Link = model("Link", linkSchema);
export default Link;
