import Product from "../models/product.js";

// Create new Product   =>  /api/v1/products
export const getProducts = async (req, res) => {
  const products = await Product.find(); // find all the product from Product schema

  res.status(200).json({
    products,
  });
};

// Create new Product   =>  /api/v1/admin/products
export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
};

// Get single product details   =>  /api/v1/products/:id
export const getProductDetails = async (req, res) => {
  // find id from db
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  // if product existe
  res.status(200).json({
    product,
  });
};

// Update product details   =>  /api/v1/products/:id
export const updateProduct = async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    // id of the pd, pass data in the body that i wanna update.
    new: true, // return back the new pd object
  });

  res.status(200).json({
    product,
  });
};

// Delete product   =>  /api/v1/products/:id
export const deleteProduct = async (req, res) => {
  // find the pd in db
  const product = await Product.findById(req?.params?.id);

  // if no pd send error
  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  // otherwise call deleteOne
  await product.deleteOne();

  res.status(200).json({
    message: "Product Deleted",
  });
};
