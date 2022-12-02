const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const Schema = mongoose.Schema;

const coordinatesSchema = new Schema({
  car_name: {type: String, required: true},
  driver_name: {type: String, required: true},
  x_coordinate: { type: Array, required: true },
  y_coordinate: { type: Array, required: true },
});

const CoordinatesModel = mongoose.model("coordinates", coordinatesSchema)

app.get("/", async (req, res) => {
    const data = await CoordinatesModel.find()
    console.log(data);
    res.send(data);
})

app.post("/", async (req, res) => {
    const body = req.body;
    const coordinates = new CoordinatesModel(body);
    const data = await coordinates.save();
    console.log(data);
    res.send({"saved": true})
})

module.exports = app

