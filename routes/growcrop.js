const express = require('express');
const router = express.Router();

// Utility function to validate latitude and longitude
function isValidLatitude(lat) {
  return typeof lat === 'number' && lat >= -90 && lat <= 90;
}

function isValidLongitude(lon) {
  return typeof lon === 'number' && lon >= -180 && lon <= 180;
}

// GET /grow-crop - render the grow-crop.ejs page
router.get('/grow-crop', (req, res) => {
  const lang = req.session.lang || req.query.lang || 'en';
  res.render('grow-crop', { lang });
});

// POST /api/bhuvan - receive lat/lon, call Bhuvan API, return soil and climate data
router.post('/api/bhuvan', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    let lang = req.body.lang || req.session.lang || req.query.lang;

    // Validate latitude and longitude
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }
    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);
    if (!isValidLatitude(latNum) || !isValidLongitude(lonNum)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude values.' });
    }

    // Validate language parameter
    const validLangs = ['en', 'hi', 'ta', 'te', 'kn', 'ml', 'mr', 'bn', 'gu', 'pa', 'or', 'as']; // example set of supported languages
    const language = (typeof lang === 'string' && validLangs.includes(lang.toLowerCase())) ? lang.toLowerCase() : 'en';

    // Persist language in session
    req.session.lang = language;

    // Simulated Bhuvan API integration
    // In production, replace this function with an actual API call to Bhuvan service
    async function fetchBhuvanData(lat, lon) {
      // Simulate API processing delay (optional)
      // await new Promise(resolve => setTimeout(resolve, 100));

      // Simulated response data structure
      return {
        soilType: 'Loamy',
        moisture: 'Moderate',
        ph: 6.8,
        rainfall: 1200, // in mm/year
        soilTemp: 22.5, // in degree Celsius
        avgTemp: 26.3, // in degree Celsius
        humidity: 75, // in percentage
        windSpeed: 10, // in km/h
        solarRadiation: 5.5 // in kWh/m2/day
      };
    }

    // Fetch data from simulated Bhuvan API
    const bhuvanData = await fetchBhuvanData(latNum, lonNum);

    // Return structured JSON response including language
    res.json({
      soilType: bhuvanData.soilType,
      moisture: bhuvanData.moisture,
      ph: bhuvanData.ph,
      rainfall: bhuvanData.rainfall,
      soilTemp: bhuvanData.soilTemp,
      avgTemp: bhuvanData.avgTemp,
      humidity: bhuvanData.humidity,
      windSpeed: bhuvanData.windSpeed,
      solarRadiation: bhuvanData.solarRadiation,
      lang: language
    });
  } catch (error) {
    console.error('Error fetching Bhuvan data:', error);
    res.status(500).json({ error: 'Failed to fetch data from Bhuvan API.' });
  }
});

module.exports = router;