import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { caluclateOrderCost } from "../../helper/helper";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);

  return (
    <>
      <CheckoutSteps shipping confirmOrder />
      <div>
        <div>
          <h4>Shipping Info</h4>
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo?.phoneNo}
          </p>
          <p>
            <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
            {shippingInfo?.zipCode}, {shippingInfo?.country}
          </p>

          <hr />
          <h4>Your Cart Items:</h4>

          {cartItems?.map((item) => (
            <>
              <hr />
              <div>
                <img
                  className="ConfirmOrder__img"
                  src={item?.image}
                  alt={item?.name}
                  key={item?.image?.url}
                />
              </div>

              <div>
                <Link to={`/product/${item.product}`}>{item?.name}</Link>
              </div>

              <div>
                <p>
                  {item?.quantity} x ${item?.price} ={" "}
                  <b>${(item?.quantity * item.price).toFixed(2)}</b>
                </p>
              </div>
              <hr />
            </>
          ))}
        </div>

        <div>
          <div>
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span>${itemsPrice}</span>
            </p>
            <p>
              Shipping: <span>${shippingPrice}</span>
            </p>
            <p>
              Tax: <span>${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span>${totalPrice}</span>
            </p>

            <hr />
            <Link to="/payment_method">Proceed to Payment</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
