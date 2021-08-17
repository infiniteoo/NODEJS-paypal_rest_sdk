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

app.post("/pay", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "25.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          total: "25.00",
          currency: "USD",
        },
        description: "MLB baseball team hat",
      },
    ],
  };
});

app.listen(3000, () => console.log("Listening on port 3000"));
