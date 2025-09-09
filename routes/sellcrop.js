const express = require('express');
const router = express.Router();

// Placeholder translations for multi-language support
const translations = {
  en: {
    title: "Sell Your Crop",
    cropType: "Crop Type",
    quantity: "Quantity (kg)",
    location: "Location",
    selectCrop: "Select Crop",
    selectLocation: "Select Location",
    fetchPrices: "Fetch Market Prices",
    nearestMarkets: "Nearest Markets",
    priceTrends: "Price Trends",
    profitPotential: "Profit Potential",
    helpBot: "Help Bot",
    speakTip: "Speak Tip",
    error: "Error",
    loading: "Loading...",
    noData: "No data available",
    enterQuantity: "Please enter a valid quantity",
    selectCropError: "Please select a crop type",
    selectLocationError: "Please select a location",
  },
  hi: {
    title: "अपनी फसल बेचें",
    cropType: "फसल का प्रकार",
    quantity: "मात्रा (किलो)",
    location: "स्थान",
    selectCrop: "फसल चुनें",
    selectLocation: "स्थान चुनें",
    fetchPrices: "बाजार मूल्य प्राप्त करें",
    nearestMarkets: "निकटतम बाजार",
    priceTrends: "मूल्य रुझान",
    profitPotential: "लाभ की संभावना",
    helpBot: "सहायता बॉट",
    speakTip: "टिप बोलें",
    error: "त्रुटि",
    loading: "लोड हो रहा है...",
    noData: "कोई डेटा उपलब्ध नहीं",
    enterQuantity: "कृपया मान्य मात्रा दर्ज करें",
    selectCropError: "कृपया फसल प्रकार चुनें",
    selectLocationError: "कृपया स्थान चुनें",
  },
  kn: {
    title: "ನಿಮ್ಮ ಬೆಳೆ ಮಾರಾಟ ಮಾಡಿ",
    cropType: "ಬೆಳೆ ಪ್ರಕಾರ",
    quantity: "ಪ್ರಮಾಣ (ಕಿ.ಗ್ರಾ)",
    location: "ಸ್ಥಳ",
    selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    selectLocation: "ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ",
    fetchPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಪಡೆಯಿರಿ",
    nearestMarkets: "ಅತ್ತ ಅತ್ತ ಮಾರುಕಟ್ಟೆಗಳು",
    priceTrends: "ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳು",
    profitPotential: "ಲಾಭದ ಸಾಧ್ಯತೆ",
    helpBot: "ಸಹಾಯ ಬಾಟ್",
    speakTip: "ಟಿಪ್ ಹೇಳಿ",
    error: "ದೋಷ",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    noData: "ಯಾವುದೇ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ",
    enterQuantity: "ದಯವಿಟ್ಟು ಮಾನ್ಯ ಪ್ರಮಾಣವನ್ನು ನಮೂದಿಸಿ",
    selectCropError: "ದಯವಿಟ್ಟು ಬೆಳೆ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    selectLocationError: "ದಯವಿಟ್ಟು ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  },
  te: {
    title: "మీ పంటను అమ్మండి",
    cropType: "పంట రకం",
    quantity: "పరిమాణం (కి.గ్రా)",
    location: "స్థానం",
    selectCrop: "పంటను ఎంచుకోండి",
    selectLocation: "స్థానాన్ని ఎంచుకోండి",
    fetchPrices: "మార్కెట్ ధరలను పొందండి",
    nearestMarkets: "సమీప మార్కెట్లు",
    priceTrends: "ధర ధోరణులు",
    profitPotential: "లాభ అవకాశాలు",
    helpBot: "హెల్ప్ బాట్",
    speakTip: "సలహా చెప్పండి",
    error: "లోపం",
    loading: "లోడ్ అవుతోంది...",
    noData: "డేటా లేదు",
    enterQuantity: "దయచేసి సరైన పరిమాణం నమోదు చేయండి",
    selectCropError: "దయచేసి పంట రకం ఎంచుకోండి",
    selectLocationError: "దయచేసి స్థానాన్ని ఎంచుకోండి",
  },
};

// Placeholder crop types and locations
const cropOptions = ["Wheat", "Rice", "Maize", "Sugarcane", "Cotton"];
const locationOptions = [
  "Bangalore",
  "Hyderabad",
  "Delhi",
  "Mumbai",
  "Chennai",
];

// Placeholder API function to fetch market prices
// In real implementation, replace with actual API calls
const fetchMarketData = async (crop, location) => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 1000));

  if (!crop || !location) {
    throw new Error("Missing crop or location");
  }

  // Dummy data - in real app, fetch from API based on crop and location
  const markets = [
    { name: "Market A", distance_km: 5, price_per_kg: 22.5 },
    { name: "Market B", distance_km: 12, price_per_kg: 21.0 },
    { name: "Market C", distance_km: 20, price_per_kg: 23.0 },
  ];

  const priceTrends = [
    { month: "Jan", price: 20 },
    { month: "Feb", price: 21 },
    { month: "Mar", price: 22 },
    { month: "Apr", price: 23 },
    { month: "May", price: 22.5 },
  ];

  const bestPrice = Math.max(...markets.map((m) => m.price_per_kg));
  const avgPrice =
    markets.reduce((acc, m) => acc + m.price_per_kg, 0) / markets.length;

  return { markets, priceTrends, bestPrice, avgPrice };
};

// Help Bot voice guidance tips for marketplace
const voiceTips = {
  en: [
    "Always check the latest market prices before selling your crop.",
    "Consider the distance to the market when choosing where to sell.",
    "Selling during peak seasons can increase your profits.",
  ],
  hi: [
    "अपनी फसल बेचने से पहले हमेशा नवीनतम बाजार मूल्य जांचें।",
    "जहां बेचना है, बाजार की दूरी पर ध्यान दें।",
    "पीक सीजन में बेचने से आपके लाभ बढ़ सकते हैं।",
  ],
  kn: [
    "ನಿಮ್ಮ ಬೆಳೆ ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    "ಮಾರ್ಕೆಟ್ ದೂರವನ್ನು ಗಮನದಲ್ಲಿಟ್ಟು ಮಾರಾಟ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "ಶಿಖರ ಋತುವಿನಲ್ಲಿ ಮಾರಾಟ ಮಾಡುವುದರಿಂದ ಲಾಭ ಹೆಚ್ಚಬಹುದು.",
  ],
  te: [
    "మీ పంటను అమ్మే ముందు తాజా మార్కెట్ ధరలను 항상 తనిఖీ చేయండి.",
    "ఎక్కడ అమ్మాలో మార్కెట్ దూరాన్ని పరిగణించండి.",
    "పీక్ సీజన్ లో అమ్మడం మీ లాభాలను పెంచుతుంది.",
  ],
};

// GET route to render the form page
router.get('/', (req, res) => {
  // Assume language is passed as query param or default to 'en'
  const lang = req.query.lang || 'en';
  const t = translations[lang] || translations['en'];

  res.render('sellcrop', {
    lang,
    t,
    cropOptions,
    locationOptions,
    formData: { cropType: '', quantity: '', location: '' },
    error: null,
    marketData: null,
  });
});

// POST route to handle form submission and fetch market data
router.post('/', async (req, res) => {
  const lang = req.body.lang || 'en';
  const t = translations[lang] || translations['en'];

  const cropType = req.body.cropType || '';
  const quantity = req.body.quantity || '';
  const location = req.body.location || '';

  const formData = { cropType, quantity, location };

  // Validation
  if (!cropType) {
    return res.render('sellcrop', {
      lang,
      t,
      cropOptions,
      locationOptions,
      formData,
      error: t.selectCropError,
      marketData: null,
    });
  }
  if (!location) {
    return res.render('sellcrop', {
      lang,
      t,
      cropOptions,
      locationOptions,
      formData,
      error: t.selectLocationError,
      marketData: null,
    });
  }
  const qtyNum = parseFloat(quantity);
  if (isNaN(qtyNum) || qtyNum <= 0) {
    return res.render('sellcrop', {
      lang,
      t,
      cropOptions,
      locationOptions,
      formData,
      error: t.enterQuantity,
      marketData: null,
    });
  }

  try {
    const data = await fetchMarketData(cropType, location);
    data.quantity = qtyNum;
    res.render('sellcrop', {
      lang,
      t,
      cropOptions,
      locationOptions,
      formData,
      error: null,
      marketData: data,
    });
  } catch (e) {
    res.render('sellcrop', {
      lang,
      t,
      cropOptions,
      locationOptions,
      formData,
      error: e.message || t.error,
      marketData: null,
    });
  }
});

module.exports = router;

