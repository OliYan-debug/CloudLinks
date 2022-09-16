import express from "express";
import mongoose from "mongoose";
import linkRouter from "./routes/link.js"
import * as dotenv from 'dotenv'
dotenv.config();



const password = process.env.PASSWORD
const PORT = 2001;
const app = express();



mongoose.connect(`mongodb+srv://capzoro:${password}@cloudlinks.fv2iw8i.mongodb.net/myapp`);

let db = mongoose.connection;

app.set("view engine", "ejs");
db.on("error", (error) => console.log("Houve o seguinte error:", error.message));
db.once("open", () => {
  console.log("connected to the database:", db.name);
});

app.use("/", linkRouter);
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
