import apiRoute from "./api.route.js";
import imgRoute from "./img.route.js";

export default function routes(app) {
  app.use("/", apiRoute);
  app.use("/img", imgRoute);
}
