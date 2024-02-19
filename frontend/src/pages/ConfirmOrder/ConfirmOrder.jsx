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
          <h4>info livraison</h4>
          <p>
            <b>nom:</b> {user?.name}
          </p>
          <p>
            <b>tel:</b> {shippingInfo?.phoneNo}
          </p>
          <p>
            <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
            {shippingInfo?.zipCode}, {shippingInfo?.country}
          </p>

          <hr />
          <h4>panier</h4>

          {cartItems?.map((item, index) => (
            <>
              <hr />
              <div>
                <img
                  className="ConfirmOrder__img"
                  src={item?.image}
                  alt={item?.name}
                  key={index}
                />
              </div>

              <div>
                <Link to={`/product/${item.product}`}>{item?.name}</Link>
              </div>

              <div>
                <p>
                  {item?.quantity} x ${item?.price} ={" "}
                  <b>{(item?.quantity * item.price).toFixed(2)}</b>
                </p>
              </div>
              <hr />
            </>
          ))}
        </div>

        <div>
          <div>
            <h4>Recap</h4>
            <hr />
            <p>
              Totale: <span>${itemsPrice}</span>
            </p>
            <p>
              Livraison: <span>${shippingPrice}</span>
            </p>
            <p>
              Taxe: <span>{taxPrice}euro</span>
            </p>

            <hr />

            <p>
              Totale: <span>{totalPrice}</span>
            </p>

            <hr />
            <Link to="/payment_method">accèder au paiement</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
