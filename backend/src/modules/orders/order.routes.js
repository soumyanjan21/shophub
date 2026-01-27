import * as orderController from "./order.controller.js";

export default async function (fastify, opts) {
  fastify.post(
    "/",
    { preHandler: [fastify.authenticate] },
    orderController.createOrder,
  );
  fastify.get(
    "/",
    { preHandler: [fastify.authenticate] },
    orderController.getMyOrders,
  );
}
