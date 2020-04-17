"use strict";

let mongo = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectID;

module.exports = function (app, db) {
  app.route("/api/threads/:board");

  app.route("/api/replies/:board");
};
