import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = "da816dd02d04993102960e0f35e02cc6"
export const DB_PASSWORD = "U7EFeDMzbuQraaXa"
export const PORT = process.env.PORT || 3000
export const MONGO_URI = `mongodb+srv://user1:${DB_PASSWORD}@cluster0.pxq3pz5.mongodb.net/?appName=Cluster0`