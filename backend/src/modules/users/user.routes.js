import * as userController from "./user.controller.js";

export default async function (fastify, opts) {
  fastify.get(
    "/:id",
    { preHandler: [fastify.authenticate] },
    userController.getUser,
  );
  fastify.get(
    "/",
    { preHandler: [fastify.authenticate] },
    userController.getUsers,
  );
}
