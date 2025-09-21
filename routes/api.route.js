import { Router } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const TOKEN = process.env.TOKEN;
const MAIN_ROUTE = process.env.MAIN_ROUTE;
const API_KEY = process.env.API_KEY;

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
router.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`${MAIN_ROUTE}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  res.json(data);
});

router.get("/tv/:id", async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`${MAIN_ROUTE}/tv/${id}?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  res.json(data);
});

export default router;
