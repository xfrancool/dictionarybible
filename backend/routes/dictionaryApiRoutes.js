const express = require("express");
const router = express.Router();

const API = "https://dictionarybible.vercel.app/api/dictionary";

/* =========================
   🔐 AUTH
========================= */
function isAuthenticated(req, res, next) {
  if (req.user) return next();

  if (req.headers.accept?.includes("text/html")) {
    return res.redirect("/login");
  }

  return res.status(401).json({ error: "Unauthorized" });
}

router.use(isAuthenticated);

/* =========================
   🔎 SEARCH GLOBAL
========================= */
router.get("/search", async (req, res) => {
  try {
    const search = req.query.search?.toLowerCase();

    if (!search) {
      return res.status(400).json({ error: "Search required" });
    }

    const response = await fetch(`${API}?search=${search}`);
    const data = await response.json();

    const results = (data.results || [])
      .map((item) => ({
        word: item.word,
        definitions: item.definitions || [],
      }))
      .filter((item) => item.word);

    return res.json(results);
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    return res.status(500).json({ error: "Error searching" });
  }
});

/* =========================
   🔤 LETRA
========================= */
router.get("/", async (req, res) => {
  try {
    const letter = req.query.letter?.toLowerCase();

    if (!letter) {
      return res.status(400).json({ error: "Letter required" });
    }

    const response = await fetch(`${API}?letter=${letter}`);
    const data = await response.json();

    const result = Object.values(data || {})
      .map((item) => ({
        word: item.word,
        definitions: item.definitions || [],
      }))
      .filter((item) => item.word)
      .sort((a, b) => a.word.localeCompare(b.word));

    return res.json(result);
  } catch (err) {
    console.error("LETTER ERROR:", err);
    return res.status(500).json({ error: "Error loading letter" });
  }
});

/* =========================
   📖 WORD
========================= */
router.get("/word", async (req, res) => {
  try {
    const word = req.query.word?.toLowerCase();

    if (!word) {
      return res.status(400).json({ error: "Word required" });
    }

    const response = await fetch(`${API}?word=${word}`);
    const data = await response.json();

    return res.json({
      word: data.word,
      definitions: data.definitions || [],
    });
  } catch (err) {
    console.error("WORD ERROR:", err);
    return res.status(500).json({ error: "Error fetching word" });
  }
});

module.exports = router;
