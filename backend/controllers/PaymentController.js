// Stripe
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";

import Stripe from "stripe";

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

console.log(process.env.STRIPE_SECRET_KEY);

// Create stripe checkout session   =>  /api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    // cart items from front
    const line_items = body?.orderItems?.map((item) => {
      // for each item return an object
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.product }, // pass optional data to Stripe
          },
          unit_amount: item?.price * 100, // transform in cent
        },
        tax_rates: ["txr_1OjkiGDMXrKyb8KkAYtnJrWe"], // 5% taxe
        quantity: item?.quantity,
      };
    });

    const shippingInfo = body?.shippingInfo;

    const shipping_rate =
      body?.itemsPrice >= 50
        ? "shr_1OjkZLDMXrKyb8KkmArOUWkT"
        : "shr_1OjkbzDMXrKyb8KkMlBHsuND";

    // Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders`, // if payment successful, move to this url
      cancel_url: `${process.env.FRONTEND_URL}`, // unsuccessful url
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice }, // additional data to pass to Stripe
      shipping_options: [
        {
          shipping_rate,
        },
      ],
      line_items,
    });

    console.log(session);

    res.status(200).json({
      url: session.url,
    });
  }
);

// ============
const getOrderItems = async (line_items) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
};

// Create new order after payment   =>  /api/v1/payment/webhook
export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log({ session });
      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;

      const totalAmount = session.amount_total / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
      const itemsPrice = session.metadata.itemsPrice;

      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNo: session.metadata.phoneNo,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      };

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user,
      };
      console.log({ orderData });

      await Order.create(orderData);

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("Error => ", error);
  }
});
