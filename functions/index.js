const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51ICGdMFAxkSOg6L9kvYe0iPbMZqdkG9XyDLbO7RLJuE0rSg7jQ4OKgukhyiqcJ6vQfH4inQ1CMOfsoNdFNQZp48N00wuIgjORZ"
);

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request recieved for this amount:", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen comman
exports.api = functions.https.onRequest(app);
