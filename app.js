"use strict";

const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



module.exports = app;