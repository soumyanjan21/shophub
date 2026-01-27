import { MONGO_URI } from "./env.js";

export const dbConfig = {
  connectionString: MONGO_URI,
  // Add other DB options here (ssl, pool size, etc.)
};
