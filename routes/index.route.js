import apiRoute from "./api.route.js";
import imgRoute from "./img.route.js";
import userRoute from "./user.route.js";
import movieRoute from "./movie.route.js";
import seriesRoute from "./series.route.js";
export default function routes(app) {
  app.use("/", apiRoute);
  app.use("/img", imgRoute);
  app.use("/user", userRoute);
  app.use("/movie", movieRoute);
  app.use("/series", seriesRoute);
}
