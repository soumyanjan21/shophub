import cartController from "./cart.controller.js";

export default async function (app) {
  app.get("/", { preHandler: [app.authenticate] }, cartController.getCart);
  app.post("/", { preHandler: [app.authenticate] }, cartController.addItem);
  app.put(
    "/:productId",
    { preHandler: [app.authenticate] },
    cartController.updateItem,
  );
  app.delete(
    "/:productId",
    { preHandler: [app.authenticate] },
    cartController.removeItem,
  );
}
