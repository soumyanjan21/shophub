import cartController from "./cart.controller.js";

export default async function (app) {
  app.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: "Unauthorized" });
    }
  });

  app.addHook("preHandler", app.authenticate);

  app.get("/", cartController.getCart);
  app.post("/", cartController.addItem);
  app.delete("/:productId", cartController.removeItem);
}
