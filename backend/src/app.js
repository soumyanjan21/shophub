import Fastify from "fastify";
import jwtPlugin from "./plugins/jwt.plugin.js";
import authPlugin from "./plugins/auth.plugin.js";
import dbPlugin from "./plugins/db.plugin.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";

const app = Fastify({
  logger: true,
  pluginTimeout: 60000,
});

app.register(dbPlugin);
app.register(jwtPlugin);
app.register(authPlugin);

app.register(authRoutes, { prefix: "/api/auth" });
app.register(userRoutes, { prefix: "/api/users" });
app.register(productRoutes, { prefix: "/api/products" });
app.register(orderRoutes, { prefix: "/api/orders" });
app.register(cartRoutes, { prefix: "/api/cart" });

export default app;
