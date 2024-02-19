import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const increseQty = (item, quantity) => {
    const newQty = quantity + 1;

    if (newQty > item?.stock) return;

    setItemToCart(item, newQty);
  };

  const decreseQty = (item, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItem(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      {cartItems?.length === 0 ? (
        <h2>Votre panier est vide.</h2>
      ) : (
        <>
          <h2>
            <b>{cartItems?.length} produits existe</b>
          </h2>

          <div>
            {cartItems?.map((item, index) => (
              <div>
                <hr />
                <img
                  className="Cart__img"
                  src={item?.image}
                  alt={item?.name}
                  key={index}
                />

                <Link to={`/products/${item?.product}`}>{item?.name}</Link>

                <p>{item?.price}euro</p>

                <div>
                  <span onClick={() => decreseQty(item, item.quantity)}>-</span>
                  <input type="number" value={item?.quantity} readOnly />
                  <span onClick={() => increseQty(item, item.quantity)}>+</span>
                </div>
                <button onClick={() => removeCartItemHandler(item?.product)}>
                  x
                </button>
                <hr />
              </div>
            ))}
          </div>

          <div>
            <h4>recapitulatif</h4>
            <hr />
            <p>
              Quantité:
              <span>
                {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)}{" "}
                (produits)
              </span>
            </p>
            <p>
              totale:
              <span>
                {cartItems
                  ?.reduce((acc, item) => acc + item?.quantity * item.price, 0)
                  .toFixed(2)}
                euros
              </span>
            </p>
            <hr />
            <button onClick={checkoutHandler}>Payer</button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
