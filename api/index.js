const port = process.env.PORT || 3002;
const express = require("express");

let app = express();

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
  res.send({
    status: "success",
  });
});

app.listen(port);

console.log(`running on ${port}`);


module.exports = app;