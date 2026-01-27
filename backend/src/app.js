import Fastify from "fastify";
import jwtPlugin from "./plugins/jwt.plugin.js";
import authPlugin from "./plugins/auth.plugin.js";
import dbPlugin from "./plugins/db.plugin.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";

const app = Fastify({
  logger: true,
  pluginTimeout: 60000, // Increase timeout to 60 seconds for very slow DB connections
});

app.register(dbPlugin);
app.register(jwtPlugin);
app.register(authPlugin);

app.register(authRoutes, { prefix: "/api/auth" });
app.register(userRoutes, { prefix: "/api/users" });
app.register(productRoutes, { prefix: "/api/products" });
app.register(orderRoutes, { prefix: "/api/orders" });

export default app;
