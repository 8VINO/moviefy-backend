import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./routes/index.route.js";
import sequelize from'./config/sequelize.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.disable("etag");

sequelize.sync({ force: true }).then(()=>{

    console.log('conectado com o database');

})
routes(app);

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
