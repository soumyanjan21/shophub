import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Product from "../src/modules/products/product.model.js";

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../../.env") });

// Hardcoded URI fallback if .env fails to load for script
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://TestUser:8iu3qR1Xj1wOeTjG@cluster0.uujm236.mongodb.net/shophub?retryWrites=true&w=majority";

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
      type: category, // Using 'type' as per schema
      description: `This is a ${adjective.toLowerCase()} ${noun.toLowerCase()} perfect for your needs. It features high-quality materials and comes with a satisfaction guarantee.`,
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

    console.log("Clearing existing products...");
    await Product.deleteMany({});

    console.log("Generating data...");
    const products = generateProducts(100);

    console.log("Inserting products...");
    await Product.insertMany(products);

    console.log("Done! 100 products seeded.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
