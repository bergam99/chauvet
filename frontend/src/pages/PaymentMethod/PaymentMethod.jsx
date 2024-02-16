import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useStripeCheckoutSessionMutation } from "../../redux/api/orderApi";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { caluclateOrderCost } from "../../helper/helper";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");

  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  // const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      window.location.href = checkoutData?.url;
    }

    if (checkoutError) {
      // toast.error(checkoutError?.data?.message);
    }
  }, [checkoutData, checkoutError]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error?.data?.message);
  //   }

  //   if (isSuccess) {
  //     navigate("/");
  //   }
  // }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      caluclateOrderCost(cartItems);

    // if (method === "COD") {
    //   // Create COD Order
    //   const orderData = {
    //     shippingInfo,
    //     orderItems: cartItems,
    //     itemsPrice,
    //     shippingAmount: shippingPrice,
    //     taxAmount: taxPrice,
    //     totalAmount: totalPrice,
    //     paymentInfo: {
    //       status: "Not Paid",
    //     },
    //     paymentMethod: "COD",
    //   };

    //   createNewOrder(orderData);
    // }

    if (method === "Card") {
      // Stripe Checkout
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };

      stripeCheckoutSession(orderData);
    }
  };

  return (
    <>
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn py-2 w-100"
              disabled={isLoading}
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
