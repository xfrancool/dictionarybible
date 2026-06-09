# 📖 Bible Dictionary API

<p align="center">
  API REST para consultar términos bíblicos de forma rápida, estructurada y escalable.
</p>

<p align="center">
  <a href="https://dictionary-demo-api.netlify.app/"><strong>🌐 Live Demo</strong></a>
  &nbsp;|&nbsp;
  <a href="https://dictionarybible.vercel.app/api/dictionary"><strong>⚡ API Base</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success" />
  <img src="https://img.shields.io/badge/version-1.0-blue" />
  <img src="https://img.shields.io/badge/license-MIT-green" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" />
</p>

---

## 🚀 Overview

Bible Dictionary API es un servicio REST diseñado para acceder a definiciones bíblicas de forma eficiente, escalable y fácil de integrar.

Pensado para:

- Aplicaciones web
- Apps móviles
- Plataformas educativas
- Sistemas backend
- Proyectos de investigación o estudio

---

## 🌐 Base URL

https://dictionarybible.vercel.app/api/dictionary

---

## ⚙️ Features

- 🔎 Búsqueda exacta por palabra
- 🔤 Filtrado por letra (A–Z)
- 🔍 Búsqueda global (full-text)
- 📦 Arquitectura modular por archivos
- ⚡ Cache en memoria para alto rendimiento
- 🌍 Listo para producción (Vercel deploy)
- 🧠 Normalización de texto (acentos, case-insensitive)

---

## 📦 API Endpoints

### 🔎 Search (recomendado)

GET /api/dictionary?search=amor

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

GET /api/dictionary?word=dios

```json
{
  "word": "DIOS",
  "definitions": ["..."]
}
```

---

### 🔤 Filter by letter

GET /api/dictionary?letter=b

```json
{
  "BABEL": { "...": "..." },
  "BAUTISMO": { "...": "..." }
}
```

---

### 📚 Get full dataset

GET /api/dictionary

```json
{
  "totalLetters": 26,
  "data": {
    "a": { "...": "..." },
    "b": { "...": "..." }
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

| Code | Meaning               |
| ---- | --------------------- |
| 404  | Resource not found    |
| 500  | Internal server error |

```json
{
  "error": "Palabra no encontrada"
}
```

---

## 🧠 Architecture

- Dataset dividido por letras (/data/a.json, /data/b.json, etc.)
- Lazy loading bajo demanda
- Cache en memoria para optimizar performance
- Normalización de texto (acentos, espacios, case-insensitive)
- Diseño preparado para escalar a dataset grande

---

## 📈 Roadmap

- 🔐 Authentication + rate limiting
- 📊 Analytics de consultas
- 🌍 Multi-language support
- 🧠 Búsqueda por relevancia (smart search)
- 📝 Admin dashboard para gestión de contenido

---

## 🤝 Contributing

Las contribuciones son bienvenidas.

Si quieres hacer cambios importantes, abre primero un issue para discusión.

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
