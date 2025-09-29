import 'dotenv/config';

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./routes/index.route.js";
import sequelize from'./config/sequelize.js'



const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.disable("etag");

sequelize.sync({ force: false }).then(()=>{

    console.log('connected to the database');

})
routes(app);

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
