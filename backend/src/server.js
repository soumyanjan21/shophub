import app from "./app.js";
import { PORT } from "./config/env.js";

app.listen({ port: PORT }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});
