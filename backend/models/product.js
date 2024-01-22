// product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String, // type of name is String
      required: [true, "Entrez le nom du produit"],
      maxLength: [
        200,
        "Le nom du produit ne peux pas dépasser au dessus de 200 caractères",
      ],
    },
    price: {
      type: Number,
      required: [true, "Entrez le prix du produit"],
      maxLength: [5, "Le prix du produit ne peux pas dépasser 5 chiffres"],
    },
    description: {
      type: String,
      required: [true, "Entrez la description du produit"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        }, // unique ID to find image (delete..)
        url: {
          type: String,
          required: true,
        }, // url that i pass in img component to display
      },
    ],
    stock: {
      type: Number,
      required: [true, "Entrez le nombre de stock"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // create  and update add fields that contain the date
);

export default mongoose.model("Product", productSchema); // we can use "Product" to delete or put data in db.
