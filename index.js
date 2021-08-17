const express = require("express");
const ejs = require("ejs");
const paypal = require("paypal-rest-sdk");
// require dot env
require("dotenv").config();

paypal.configure({
  mode: "sandbox", // sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const app = express();

app.set("view engine", "ejs");
app.get("/", (req, res) => res.render("index"));

app.listen(3000, () => console.log("Listening on port 3000"));
