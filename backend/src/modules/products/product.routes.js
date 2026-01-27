import controller from "./product.controller.js";

export default async function (app) {
  app.get("/", controller.getAll);

  app.post(
    "/",
    {
      preHandler: [app.authenticate],
    },
    controller.create,
  );
}
