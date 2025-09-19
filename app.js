import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6969;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.disable("etag");

routes(app);

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
