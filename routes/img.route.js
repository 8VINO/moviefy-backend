import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const TOKEN = process.env.TOKEN;
const SECONDARY_ROUTE = process.env.SECONDARY_ROUTE;

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
       /* ROTA --> */ SECONDARY_ROUTE + urlParam,
      fetchOptions
    );

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    res.setHeader("Content-Type", "image/jpeg");

    const buffer = Buffer.from(await response.arrayBuffer());
    res.status(response.status).send(buffer);

    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
