let chaiHttp = require("chai-http");
let chai = require("chai");
let assert = chai.assert;
let server = require("../server");

chai.use(chaiHttp);

let testId;
let testId_reply;

suite("Functional Tests", function () {
  suite("API ROUTING FOR /api/threads/:board", function () {
    suite("POST", function () {
      test("create new threads", function (done) {
        chai
          .request(server)
          .post("/api/threads/test")
          .send({ text: "1234", delete_password: "asdf" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });
    });

    suite("GET", function () {
      test("get threads", function (done) {
        chai
          .request(server)
          .get("/api/threads/test")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "_id");
            assert.property(res.body[0], "createdon_");
            assert.property(res.body[0], "bumpedon_");
            assert.property(res.body[0], "text");
            assert.property(res.body[0], "replies");
            assert.isArray(res.body[0].replies);
            testId = res.body[0]._id;
            done();
          });
      });
    });

    suite("PUT", function () {
      test("report thread", function (done) {
        chai
          .request(server)
          .put("/api/threads/test")
          .send({ report_id: testId })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "success");
            done();
          });
      });
    });

    suite("DELETE", function () {
      test("wrong password", function (done) {
        chai
          .request(server)
          .delete("/api/threads/test")
          .send({ thread_id: testId, delete_password: "fdgfd" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "incorrect password");
            done();
          });
      });
    });
  });

  suite("API ROUTING FOR /api/replies/:board", function () {
    suite("POST", function () {
      test("reply to thread", function (done) {
        chai
          .request(server)
          .post("/api/replies/test")
          .send({
            thread_id: testId,
            text: "a reply",
            delete_password: "1111",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });
    });

    suite("GET", function () {
      test("Get replies", function (done) {
        chai
          .request(server)
          .get("/api/replies/test")
          .query({ thread_id: testId })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "_id");
            assert.property(res.body, "createdon_");
            assert.property(res.body, "bumpedon_");
            assert.property(res.body, "text");
            assert.property(res.body, "replies");
            assert.equal(res.body.replies[0].text, "a reply");
            testId_reply = res.body.replies[0]._id;
            done();
          });
      });
    });

    suite("PUT", function () {
      test("report reply", function (done) {
        chai
          .request(server)
          .put("/api/replies/test")
          .send({ thread_id: testId, reply_id: testId_reply })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "success");
            done();
          });
      });
    });

    suite("DELETE", function () {
      test("delete reply with wrong password", function (done) {
        chai
          .request(server)
          .delete("/api/replies/test")
          .send({
            thread_id: testId,
            reply_id: testId_reply,
            delete_password: "ytutr",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "incorrect password");
            done();
          });
      });

      test("delete reply with correct password", function (done) {
        chai
          .request(server)
          .delete("/api/replies/test")
          .send({
            thread_id: testId,
            reply_id: testId_reply,
            delete_password: "1111",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "success");
            done();
          });
      });
    });
  });
});
