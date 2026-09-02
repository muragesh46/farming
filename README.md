# AgriAdvisory — Smart Agro-Climatic & Crop Recommendation Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-black?style=flat-square&logo=express)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/Frontend-EJS_Templating-a91e50?style=flat-square)](https://ejs.co/)
[![Languages](https://img.shields.io/badge/Localization-12_Indian_Languages-blue?style=flat-square)](https://github.com/muragesh46/farming)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

An AgriTech advisory web platform engineered to deliver automated crop feasibility analysis, soil parameter assessment, fertilizer recommendations, and direct crop selling interfaces tailored for regional farmers.

---

## 📌 Overview

Agricultural yields heavily depend on precise microclimate and soil telemetry (pH levels, soil moisture, annual precipitation, and solar radiation). **AgriAdvisory** bridges the gap between complex geo-spatial data and regional farmers by automating parameter ingestion (simulating Bhuvan geospatial APIs) and translating agricultural insights into 12 localized Indian languages.

---

## ✨ Features

- **Geo-Climatic Soil Analysis:** Ingests GPS latitude and longitude coordinates to evaluate soil type, moisture index, pH value, annual rainfall, average temperature, and solar irradiance.
- **Data-Driven Crop Recommendation:** Matches soil telemetry against agronomic thresholds to recommend high-yield crop cultivars.
- **Fertilizer Advisory System:** Recommends targeted chemical and organic fertilizer ratios based on identified nutrient deficiencies.
- **Farmer Direct Marketplace:** Interface allowing farmers to list harvested crops, specify quantities, and connect with potential buyers.
- **Comprehensive Localization (12 Languages):** Dynamic language persistence across sessions supporting English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Odia, and Assamese.

---

## 🛠️ Tech Stack

- **Backend Runtime:** Node.js, Express.js
- **Templating & UI:** EJS (Embedded JavaScript), CSS3, Vanilla JavaScript
- **State & Session:** Express-Session, Cookie-Parser
- **Geospatial & Telemetry:** HTML5 Geolocation API, Bhuvan Geo-Data Interface simulation
- **Logging & Utilities:** Morgan, Debug, Http-Errors

---

## 🏗️ Architecture & Recommendation Flow

```
[ Farmer Client / Geolocation ]
            │
            │  1. POST /api/bhuvan { latitude, longitude, lang }
            ▼
┌─────────────────────────────────────────────┐
│             Express API Gateway             │
│   - Validates coordinates bounds (-90..90)  │
│   - Checks & persists regional language     │
│   - Queries Geo-Soil Data (Bhuvan Adapter)  │
└─────────────────────────────────────────────┘
            │
            │  2. Telemetry JSON (pH, Moisture, Temp, Rainfall)
            ▼
[ Agricultural Recommendation Rules Engine ]
            │
            ▼
[ Localized EJS View Rendered in Farmer's Preferred Language ]
```

---

## 📸 Screenshots

> *Recommended UI Captures:*
> 1. **Soil Analysis Dashboard:** Geolocation input panel and soil telemetry display (pH, rainfall, temperature).
> 2. **Crop Recommendation Matrix:** Suitable crop cards with growing requirements.
> 3. **Marketplace Interface:** Form for listing crop yields with pricing.
> 4. **Multilingual Dropdown:** Selection menu demonstrating regional language localization.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/muragesh46/farming.git
cd farming
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
# Start standard server
npm start
```
Open `http://localhost:3000` in your web browser.

---

## 🔮 Future Improvements

- [ ] Live integration with the production Indian Space Research Organisation (ISRO) Bhuvan REST API.
- [ ] Computer-vision based plant disease detection from leaf photographs.
- [ ] Real-time Agricultural Produce Market Committee (APMC) mandi price ticker.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
