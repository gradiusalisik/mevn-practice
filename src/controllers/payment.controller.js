const dollarsToCents = require("dollars-to-cents");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51I9ci4AdZgWT7XA6KiWbvKVcRCMsrxiwPXa5llIlamLyzK3jYBMwLkW8FqRPKMHnxxL0bLYLtbdgZPvU8Dc3dlr600pgBc9PG9"
);

const createPaymentIntent = async ({ body: { amount } }, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: dollarsToCents(amount),
      currency: "eur",
      payment_method_types: ["card"],
    });
    return res.status(200).send(paymentIntent);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// const stripeWebHook = async ({ body }, res) => {
//   try {

//   } catch (error) {

//   }
// }

module.exports = {
  createPaymentIntent,
};
