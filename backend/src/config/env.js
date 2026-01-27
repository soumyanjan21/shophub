import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = "da816dd02d04993102960e0f35e02cc6"
export const DB_PASSWORD = "8iu3qR1Xj1wOeTjG"
export const PORT = process.env.PORT || 3000
export const MONGO_URI = `mongodb+srv://TestUser:${DB_PASSWORD}@cluster0.uujm236.mongodb.net/shophub?retryWrites=true&w=majority`
  