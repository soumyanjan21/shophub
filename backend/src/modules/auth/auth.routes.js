import authController from "./auth.controller.js";

export default async function (app) {
  app.post("/register", authController.register);
  app.post("/login", authController.login);
}
