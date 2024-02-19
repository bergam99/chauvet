import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div>
      {shipping ? (
        <Link to="/shipping">
          <div className="CheckoutSteps__active">Livraison</div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="CheckoutSteps__disabled">Livraison</div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/confirm_order">
          <div className="CheckoutSteps__active">confirmer la commande</div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="CheckoutSteps__disabled">confirmer la commande</div>
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
