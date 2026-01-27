import fp from "fastify-plugin";
import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";

export default fp(async (app) => {
  try {
    app.log.info(
      `Connecting to MongoDB at ${MONGO_URI.replace(/:[^:@]*@/, ":****@")}...`,
    );
    await mongoose.connect(MONGO_URI);
    app.log.info("✅ MongoDB connected");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
});
