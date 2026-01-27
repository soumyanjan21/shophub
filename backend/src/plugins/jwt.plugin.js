import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { jwtConfig } from "../config/jwt.js";

export default fp(async (app) => {
  app.register(fastifyJwt, {
    secret: jwtConfig.SECRET,
  });
});
