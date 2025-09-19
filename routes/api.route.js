import { Router } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const TOKEN = process.env.TOKEN;
const MAIN_ROUTE = process.env.MAIN_ROUTE;


router.all("/", async (req, res) => {
  const urlParam = req.query.url;
  const userToken = TOKEN;


  if (!urlParam) {
    return res.status(400).json({ error: "URL obrigatória" });
  }

  const headers = {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": req.headers["content-type"] || "application/json",
  };

  const fetchOptions = {
    method: req.method,
    headers,
  };

  if (!["GET", "HEAD"].includes(req.method)) {
    fetchOptions.body =
      req.body && Object.keys(req.body).length > 0
        ? JSON.stringify(req.body)
        : undefined;
  }

  try {
    const response = await fetch(
      MAIN_ROUTE + urlParam,
      fetchOptions
    );

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
