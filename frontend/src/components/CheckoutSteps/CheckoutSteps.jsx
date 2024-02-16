import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div>
      {shipping ? (
        <Link to="/shipping">
          <div className="CheckoutSteps__active">Shipping</div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="CheckoutSteps__disabled">Shipping</div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/confirm_order">
          <div className="CheckoutSteps__active">Confirm Order</div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="CheckoutSteps__disabled">Confirm Order</div>
        </Link>
      )}

      {payment ? (
        <Link to="/payment_method">
          <div className="CheckoutSteps__active">Payment</div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="CheckoutSteps__disabled">Payment</div>
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
