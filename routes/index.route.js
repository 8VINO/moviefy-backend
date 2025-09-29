import apiRoute from "./api.route.js";
import imgRoute from "./img.route.js";
import userRoute from "./user.route.js";
export default function routes(app) {
  app.use("/", apiRoute);
  app.use("/img", imgRoute);
  app.use("/user", userRoute);
}
