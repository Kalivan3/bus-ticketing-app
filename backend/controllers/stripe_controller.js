const express = require("express");
const router = express.Router();
const Stripe_Key =
  "sk_test_....Qb";
const stripe = require("stripe")(Stripe_Key);
const customerId = "cus_IDxx....orXTO";


// Create a new customer for stripe
router.post("/newCustomer", async (req, res) => {
  console.log("\n\n Body Passed:", req.body);
  try {
    const customer = await stripe.customers.create(
      {
        email: req.body.email,
      }
      // {
      //   // If you are using your own api then you can add your organization account here. So it will link the customer with your organization
      //   stripeAccount: process.env.StripeAccountId,
      //}
    );
    return res.status(200).send({
      //   customerDetails: customer,
      customerId: customer.id,
      customerEmail: customer.email,
    });
  } catch (error) {
    return res.status(400).send({ Error: error.raw.message });
  }
});

// Create a payment charge
router.post("/createCharge", async (req, res) => {
  const { amount, cardId, oneTime, email } = req.body;
  if (oneTime) {
    const {
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVC,
    } = req.body;

    if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
      return res.status(400).send({
        Error: "Necessary Card Details are required for One Time Payment",
      });
    }
    try {
      const cardToken = await stripe.tokens.create({
        card: {
          number: cardNumber,
          exp_month: cardExpMonth,
          exp_year: cardExpYear,
          cvc: cardCVC
        },
      });

      const charge = await stripe.charges.create({
        amount: amount,
        currency: "usd",
        source: cardToken.id,
        receipt_email: email,
        description: `Stripe Charge Of Amount ${amount} for One Time Payment`,
      });

      if (charge.status === "succeeded") {
        return res.status(200).send({ Success: charge });
      } else {
        return res
          .status(400)
          .send({ Error: "Please try again later for One Time Payment" });
      }
    } catch (error) {
      return res.status(400).send({
        Error: error.raw.message,
      });
    }
  } else {
    try {
      const createCharge = await stripe.charges.create({
        amount: amount,
        currency: "usd",
        receipt_email: email,
        customer: customerId,
        card: cardId,
        description: `Stripe Charge Of Amount ${amount} for Payment`,
      });
      if (createCharge.status === "succeeded") {
        return res.status(200).send({ Success: charge });
      } else {
        return res
          .status(400)
          .send({ Error: "Please try again later for payment" });
      }
    } catch (error) {
      return res.status(400).send({
        Error: error.raw.message,
      });
    }
  }
});

module.exports = router;