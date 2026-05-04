# 📖 Bible Dictionary API

<p align="center">
  API REST para consultar términos bíblicos de forma rápida, estructurada y escalable.
</p>

<p align="center">
  <a href="https://dictionarybible.vercel.app/api/dictionary"><strong>🌐 Live API</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success" />
  <img src="https://img.shields.io/badge/version-1.0-blue" />
  <img src="https://img.shields.io/badge/license-MIT-green" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" />
</p>

---

## 🚀 Overview

**Bible Dictionary API** es un servicio REST diseñado para acceder a definiciones bíblicas de forma eficiente.

Pensado para:

- Aplicaciones web
- Apps móviles
- Herramientas educativas
- Integraciones backend

---

## 🌐 Base URL

```http
https://dictionarybible.vercel.app/api/dictionary
```

---

## ⚙️ Features

- 🔎 Búsqueda exacta por palabra
- 🔤 Filtrado por letra
- 🔍 Búsqueda global (full-text)
- 📦 Arquitectura modular (A-Z)
- ⚡ Optimizado con cache en memoria
- 🌍 Listo para producción

---

## 📦 Endpoints

### 🔎 Search (recomendado)

```http
GET /api/dictionary?search=amor
```

```json
{
  "total": 2,
  "results": [
    {
      "word": "AMOR",
      "definitions": ["..."]
    }
  ]
}
```

---

### 📌 Get by word

```http
GET /api/dictionary?word=dios
```

```json
{
  "word": "DIOS",
  "definitions": ["..."]
}
```

---

### 🔤 Filter by letter

```http
GET /api/dictionary?letter=b
```

```json
{
  "BABEL": { ... },
  "BAUTISMO": { ... }
}
```

---

### 📚 Get full dataset

```http
GET /api/dictionary
```

```json
{
  "totalLetters": 26,
  "data": {
    "a": { ... },
    "b": { ... }
  }
}
```

---

## 🧪 Quick Start

```js
const res = await fetch(
  "https://dictionarybible.vercel.app/api/dictionary?search=fe",
);
const data = await res.json();

console.log(data);
```

---

## ⚠️ Error Handling

| Code | Description           |
| ---- | --------------------- |
| 404  | Not found             |
| 500  | Internal server error |

```json
{
  "error": "Palabra no encontrada"
}
```

---

## 🧠 Architecture

- Datos divididos por letras (`/data/a.json`, `/data/b.json`)
- Carga bajo demanda (lazy loading)
- Cache en memoria para mejorar performance
- Normalización de texto (acentos, espacios, case-insensitive)

---

## 📈 Roadmap

- 🔐 Auth & rate limiting
- 📊 Ranking de resultados
- 🌍 Multi-language
- 🧠 Búsqueda inteligente (relevancia)
- 📝 Admin dashboard

---

## 🤝 Contributing

Pull requests son bienvenidos.
Para cambios grandes, abrí un issue primero.

---

## 📫 Contact

<p align="center">
  <a href="https://github.com/xfrancool" target="_blank">
    <img src="https://skillicons.dev/icons?i=github" width="35"/>
  </a>
  &nbsp;&nbsp;
  <a href="mailto:xfrancool6@gmail.com">
    <img src="https://skillicons.dev/icons?i=gmail" width="35"/>
  </a>
</p>

---

## 📄 License

MIT License © 2026 Franco Ortega

---

## ⚡ Philosophy

Construido como un producto real.
Simple, útil y escalable.
