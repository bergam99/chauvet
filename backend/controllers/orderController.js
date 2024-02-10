// import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
// import Product from "../models/product.js";
// import Order from "../models/order.js";
// import ErrorHandler from "../utils/errorHandler.js";

// // Create new Order  =>  /api/v1/orders/new
// export const newOrder = catchAsyncErrors(async (req, res, next) => {
//   const {
//     orderItems,
//     shippingInfo,
//     itemsPrice,
//     shippingAmount,
//     totalAmount,
//     paymentMethod,
//     paymentInfo,
//   } = req.body;

//   const order = await Order.create({
//     orderItems,
//     shippingInfo,
//     itemsPrice,
//     shippingAmount,
//     totalAmount,
//     paymentMethod,
//     paymentInfo,
//     user: req.user._id,
//   });

//   res.status(200).json({
//     order,
//   });
// });

// // Get current user orders  =>  /api/v1/me/orders
// export const myOrders = catchAsyncErrors(async (req, res, next) => {
//   const orders = await Order.find({ user: req.user._id });

//   res.status(200).json({
//     orders,
//   });
// });

// // Get order details  =>  /api/v1/orders/:id
// export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id).populate(
//     "user",
//     "name email"
//   );

//   if (!order) {
//     return next(new ErrorHandler("Aucune commande n'a été faite", 404));
//   }

//   res.status(200).json({
//     order,
//   });
// });
