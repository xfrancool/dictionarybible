import fs from "fs";
import path from "path";

function normalize(text) {
  return text
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* cache simple */
const cache = {};

function loadFile(letter) {
  if (cache[letter]) return cache[letter];

  const filePath = path.join(process.cwd(), "data", `${letter}.json`);

  if (!fs.existsSync(filePath)) return null;

  const file = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(file);

  cache[letter] = data;

  return data;
}

/* 👉 cargar todo */
function loadAllData() {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const result = {};

  for (const letter of letters) {
    const data = loadFile(letter);
    if (data) {
      result[letter] = data;
    }
  }

  return result;
}

/* 👉 búsqueda global */
function searchAll(query) {
  const allData = loadAllData();
  const results = [];

  for (const letter in allData) {
    const words = allData[letter];

    for (const key in words) {
      if (normalize(key).includes(query)) {
        results.push({
          word: key,
          ...words[key],
        });
      }
    }
  }

  return results;
}

export default function handler(req, res) {
  const { word, letter, search } = req.query;

  try {
    /* 🔎 SEARCH GLOBAL */
    if (search) {
      const query = normalize(search);
      const results = searchAll(query);

      return res.status(200).json({
        total: results.length,
        results,
      });
    }

    /* 👉 TODO EL DICCIONARIO */
    if (!word && !letter) {
      const allData = loadAllData();

      return res.status(200).json({
        totalLetters: Object.keys(allData).length,
        data: allData,
      });
    }

    /* LETRA */
    if (letter) {
      const key = normalize(letter);
      const data = loadFile(key);

      if (!data) {
        return res.status(404).json({ error: "Letra no encontrada" });
      }

      return res.status(200).json(data);
    }

    /* PALABRA */
    if (word) {
      const key = normalize(word);
      const firstLetter = key[0];

      const data = loadFile(firstLetter);

      if (!data) {
        return res.status(404).json({ error: "Letra no encontrada" });
      }

      const cleanKey = Object.keys(data).find((k) => normalize(k) === key);

      if (!cleanKey) {
        return res.status(404).json({
          error: "Palabra no encontrada",
        });
      }

      return res.status(200).json(data[cleanKey]);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno" });
  }
}
