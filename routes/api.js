"use strict";

let mongo = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectID;

module.exports = function (app, db) {
  app
    .route("/api/threads/:board")

    .post((req, res) => {
      let board = req.params.board;
      let thread = {
        text: req.body.text,
        deletepassword_: req.body.delete_password,
        createdon_: new Date(),
        bumpedon_: new Date(),
        reported: false,
        replies: [],
      };
      db.collection(board).insertOne(thread, (err, doc) => {
        if (err) {
          res.redirect("/");
        } else {
          thread._id = doc.insertedId;
          res.redirect("/b/" + board + "/");
        }
      });
    })

    .get((req, res) => {
      let board = req.params.board;

      db.collection(board)
        .find(
          {},
          {
            reported: 0,
            deletepassword_: 0,
            "replies.reported": 0,
            "replies.deletepassword_": 0,
          }
        )
        .sort({ bumpedon_: -1 })
        .limit(10)
        .toArray(function (err, docs) {
          docs.map((item) => {
            item.replycount = item.replies.length;
            if (item.replycount > 3) {
              item.replies = item.replies.slice(0, 3);
            }
          });
          res.json(docs);
        });
    })

    .put((req, res) => {
      let board = req.params.board;

      let thread = {
        _id: new ObjectId(req.body.report_id),
      };

      db.collection(board).findAndModify(
        thread,
        [],
        { $set: { reported: true } },
        function (err, doc) {
          if (err) {
            res
              .status(400)
              .type("text")
              .send("could not update " + thread._id);
            res.end();
          } else {
            res.send("success");
            res.end();
          }
        }
      );
    })

    .delete((req, res) => {
      let board = req.params.board;

      let thread = {
        _id: new ObjectId(req.body.thread_id),
        deletepassword_: req.body.delete_password,
      };

      db.collection(board).findOneAndDelete(thread, function (err, doc) {
        if (err) {
          res
            .status(400)
            .type("text")
            .send("could not delete " + thread._id);
          res.end();
        } else {
          if (doc.value === null) {
            res.send("incorrect password");
            res.end();
          } else {
            res.send("success");
            res.end();
          }
        }
      });
    });

  app.route("/api/replies/:board");
};
