import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Product from "../src/modules/products/product.model.js";

const categories = ["Electronics", "Clothing", "Furniture", "Books", "Others"];

const adjectives = [
  "Amazing",
  "Incredible",
  "Modern",
  "Classic",
  "Durable",
  "Lightweight",
  "Premium",
  "Sustainable",
];

const nouns = [
  "Widget",
  "Gadget",
  "Shirt",
  "Chair",
  "Table",
  "Book",
  "Lamp",
  "Watch",
  "Shoes",
  "Bag",
];

const generateProducts = (count) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    products.push({
      name: `${adjective} ${noun} ${i + 1}`,
      price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
      stock: Math.floor(Math.random() * 100),
      type: category,
      description: `This is a ${adjective.toLowerCase()} ${noun.toLowerCase()} perfect for your needs.`,
      image: `https://placehold.co/400?text=${adjective}+${noun}`,
    });
  }

  return products;
};

const seed = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(MONGO_URI);

    console.log("Connected.");

    await Product.deleteMany({});
    const products = generateProducts(100);
    await Product.insertMany(products);

    console.log("✅ 100 products seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seed();