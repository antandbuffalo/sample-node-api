const port = process.env.PORT || 3002;
const express = require("express");
const bodyParser = require("body-parser");
const dataHolder = require("./cache");
const {
  cleanQuickNoteRequest,
  validateQuickNoteRequest,
  validateQuickNoteSyncRequest,
  validateGetPasscodeRequest,
  generateRandomNumber,
} = require("./util");

let app = express();
let jsonParser = bodyParser.json();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Respond to preflight request
  if (req.method === "OPTIONS") {
    res.status(200);
    res.end();
    return;
  }
  next();
});

app.get("/", async function (req, res) {
  res.send("ok");
});

app.get("/quicknote", function (req, res) {
  if (!req.query.id) {
    res.statusCode = 404;
    res.send({ status: "error", message: "id not found" });
  } else {
    // save to cache
    res.statusCode = 200;
    res.send({
      status: "success",
      text: dataHolder.quickNotes[req.query.id],
    });
  }
});

app.post("/quicknote", jsonParser, function (req, res) {
  const cleanRequest = cleanQuickNoteRequest(req.body);
  console.log(req.body);
  if (!validateQuickNoteRequest(cleanRequest)) {
    res.statusCode = 404;
    res.send({ status: "error", message: "id not found" });
  } else {
    // save to cache
    dataHolder.quickNotes[cleanRequest.id] = cleanRequest.text;
    res.statusCode = 200;
    res.send({ status: "success" });
  }
});

// get passcode
app.post("/quicknote/sync", jsonParser, function (req, res) {
  if (!validateGetPasscodeRequest(req.body)) {
    res.statusCode = 404;
    res.send({ status: "error", message: "id not found" });
  } else {
    const passcode = generateRandomNumber(8);
    dataHolder.quickNotesPasscodeMap[passcode] = req.body.id;
    if (req.body.text) {
      dataHolder.quickNotes[req.body.id] = req.body.text;
    }

    res.statusCode = 200;
    res.send({ status: "success", passcode });
  }
});

// validate passcode and get text
app.post("/quicknote/sync/validate", jsonParser, function (req, res) {
  const cleanRequest = cleanQuickNoteRequest(req.body);

  if (!validateQuickNoteSyncRequest(cleanRequest)) {
    res.statusCode = 404;
    res.send({ status: "error", message: "passcode not found" });
  } else {
    // if control reached here, passcode is available
    const tempId = dataHolder.quickNotesPasscodeMap[cleanRequest.passcode];
    if (tempId) {
      res.statusCode = 200;
      res.send({
        status: "success",
        text: dataHolder.quickNotes[tempId],
        id: tempId,
      });
      // delete
      delete dataHolder.quickNotesPasscodeMap[cleanRequest.passcode];
    } else {
      res.statusCode = 404;
      res.send({ status: "error", message: "passcode not found or expired" });
    }
  }
});

app.listen(port);

console.log(`running on ${port}`);

module.exports = app;
