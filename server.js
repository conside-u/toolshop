import express from "express";
import pg from "pg";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PORT = Number(process.env.PORT) || 8080;
const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://toolshop:toolshop@localhost:5432/toolshop";

const pool = new pg.Pool({ connectionString: DATABASE_URL });
const app = express();
const publicDir = join(dirname(fileURLToPath(import.meta.url)), "public");

// Клієнт (HTML-сторінка) віддається тим самим сервером — без CORS
app.use(express.static(publicDir));

// GET /items — список товарів із таблиці items
app.get("/items", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT id, name FROM items ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("DB error:", err.code || err.message);
    res.status(500).json({ error: "database_unavailable" });
  }
});

app.listen(PORT, () => console.log(`ToolShop API: http://localhost:${PORT}`));
