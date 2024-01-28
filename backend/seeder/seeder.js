import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";
// import product from "../models/product.js";
//connect to db
const seedProducts = async () => {
  try {
    // push pd
    await mongoose.connect("mongodb://localhost:27017/shopChauvet"); // connect to db to push the products in db.
    //delete all the pds
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("Products are added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
