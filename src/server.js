"use strict";

var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    controller = require("./controller.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.route("/api/pets")
    .get(controller.query)
app.route("/api/pets/:id")
    .get(controller.getOne)

app.route("/api/adoptions")
    .get(controller.getAdoptions)
    .post(controller.postAdoption)

app.route("/api/adoptions/:id")
    .delete(controller.deleteAdoption)

app.route("/api/categories")
    .get(controller.getCategories);

app.route("/api/reset")
    .get(controller.resetPets);

app.listen(3000, function() {
    console.log("Server started");
});