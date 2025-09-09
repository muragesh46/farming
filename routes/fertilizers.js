const express = require('express');
const router = express.Router();
const crops = [
  { id: 'wheat', name: { en: 'Wheat', es: 'Trigo', hi: 'गेहूँ', kn: 'ಗೋಧಿ', te: 'గోధుమ' } },
  { id: 'corn', name: { en: 'Corn', es: 'Maíz', hi: 'मक्का', kn: 'ಮಕ್ಕಿ', te: 'మొక్కజొన్న' } },
  { id: 'rice', name: { en: 'Rice', es: 'Arroz', hi: 'चावल', kn: 'ಅನ್ನ', te: 'బియ్యం' } }
];

const growthStages = {
  wheat: [
    { id: 'seedling', name: { en: 'Seedling', es: 'Plántula', hi: 'कली', kn: 'ತಳಿರು', te: 'మొక్క' } },
    { id: 'tillering', name: { en: 'Tillering', es: 'Macollamiento', hi: 'टिलरिंग', kn: 'ಟಿಲ್ಲರಿಂಗ್', te: 'టిల్లరింగ్' } },
    { id: 'heading', name: { en: 'Heading', es: 'Encabezamiento', hi: 'हेडिंग', kn: 'ತಲೆ', te: 'తల' } }
  ],
  corn: [
    { id: 'vegetative', name: { en: 'Vegetative', es: 'Vegetativo', hi: 'वेजेटेटिव', kn: 'ಸಸ್ಯ', te: 'వెజిటేటివ్' } },
    { id: 'flowering', name: { en: 'Flowering', es: 'Floración', hi: 'फ्लावरिंग', kn: 'ಹೂವು', te: 'పువ్వు' } },
    { id: 'maturity', name: { en: 'Maturity', es: 'Madurez', hi: 'परिपक्वता', kn: 'ಪೂರ್ಣತೆ', te: 'పూర్ణత' } }
  ],
  rice: [
    { id: 'transplanting', name: { en: 'Transplanting', es: 'Transplante', hi: 'रोपण', kn: 'ನಡುವಣಿಕೆ', te: 'నాటింపు' } },
    { id: 'panicle_initiation', name: { en: 'Panicle Initiation', es: 'Inicio de Panícula', hi: 'पैनिकल प्रारंभ', kn: 'ಪ್ಯಾನಿಕಲ್ ಪ್ರಾರಂಭ', te: 'పానికల్ ప్రారంభం' } },
    { id: 'grain_filling', name: { en: 'Grain Filling', es: 'Llenado de Grano', hi: 'अनाज भरना', kn: 'ಅನ್ನ ತುಂಬಿಸುವಿಕೆ', te: 'గింజ నింపడం' } }
  ]
};

const nutrientDeficiencySolutions = {
  nitrogen: {
    en: 'Apply nitrogen-rich fertilizers such as urea or ammonium nitrate.',
    es: 'Aplique fertilizantes ricos en nitrógeno como urea o nitrato de amonio.',
    hi: 'यूरिया या अमोनियम नाइट्रेट जैसे नाइट्रोजन युक्त उर्वरक लगाएं।',
    kn: 'ಯೂರಿಯಾ ಅಥವಾ ಅಮೋನಿಯಂ ನೈಟ್ರೇಟ್ ಹೋಲಿನ ನೈಟ್ರೋಜನ್ ಸಮೃದ್ಧ ಖಡ್ಕಗಳನ್ನು ಬಳಸಿ.',
    te: 'యూరియా లేదా అమెనియం నైట్రేట్ వంటి నైట్రోజన్-సమృద్ధి ఎరువులు ఉపయోగించండి.'
  },
  phosphorus: {
    en: 'Use phosphorus fertilizers like superphosphate or rock phosphate.',
    es: 'Use fertilizantes de fósforo como superfosfato o fosfato de roca.',
    hi: 'सुपरफॉस्फेट या रॉक फॉस्फेट जैसे फॉस्फोरस उर्वरकों का उपयोग करें।',
    kn: 'ಸೂಪರ್‌ಫಾಸ್ಫೇಟ್ ಅಥವಾ ರಾಕ್ ಫಾಸ್ಫೇಟ್ ಹೋಲಿನ ಫಾಸ್ಫರಸ್ ಸಮೃದ್ಧ ಖಡ್ಕಗಳನ್ನು ಬಳಸಿ.',
    te: 'సూపర్‌ఫాస్ఫేట్ లేదా రాక్ ఫాస్ఫేట్ వంటి ఫాస్ఫరస్ ఎరువులు ఉపయోగించండి.'
  },
  potassium: {
    en: 'Apply potassium fertilizers such as muriate of potash.',
    es: 'Aplique fertilizantes de potasio como muriato de potasa.',
    hi: 'म्युरिएट ऑफ पोटाश जैसे पोटैशियम उर्वरक लगाएं।',
    kn: 'ಮ್ಯುರಿಯೇಟ್ ಆಫ್ ಪೊಟಾಶ್ ಹೋಲಿನ ಪೊಟಾಶಿಯಂ ಸಮೃದ್ಧ ಖಡ್ಕಗಳನ್ನು ಬಳಸಿ.',
    te: 'మురియేట్ ఆఫ్ పోటాష్ వంటి పొటాషియం ఎరువులు ఉపయోగించండి.'
  }
};

// API endpoint for fetching fertilizer recommendations
const API_URL = '/api/fertilizers';

// Note: currentLanguage will be handled server-side in route handlers, not here.

// Translate function to fetch appropriate language text with fallback to English
function translate(textObj) {
  return textObj[currentLanguage] || textObj['en'] || '';
}

// Populate crop selection dropdown dynamically
function populateCropSelect() {
  const cropSelect = document.getElementById('crop-select');
  cropSelect.innerHTML = '';
  crops.forEach(crop => {
    const option = document.createElement('option');
    option.value = crop.id;
    option.textContent = translate(crop.name);
    cropSelect.appendChild(option);
  });
}

// Populate growth stage selection based on selected crop
function populateGrowthStageSelect(cropId) {
  const stageSelect = document.getElementById('growth-stage-select');
  stageSelect.innerHTML = '';
  if (!growthStages[cropId]) return;
  growthStages[cropId].forEach(stage => {
    const option = document.createElement('option');
    option.value = stage.id;
    option.textContent = translate(stage.name);
    stageSelect.appendChild(option);
  });
}

// Show loading state in recommendations container
function showLoading() {
  const container = document.getElementById('recommendations');
  container.innerHTML = '';
  const loadingText = {
    en: 'Loading recommendations...',
    es: 'Cargando recomendaciones...',
    hi: 'सिफारिशें लोड हो रही हैं...',
    kn: 'ಶಿಫಾರಸುಗಳನ್ನು ಲೋಡ್ ಮಾಡುತ್ತಿದೆ...',
    te: 'సిఫార్సులను లోడ్ చేస్తున్నాము...'
  };
  container.textContent = translate(loadingText);
}

// Show error message in recommendations container
function showError(error) {
  const container = document.getElementById('recommendations');
  container.innerHTML = '';
  const errorText = {
    en: 'Error fetching recommendations. Please try again later.',
    es: 'Error al obtener recomendaciones. Por favor, inténtelo de nuevo más tarde.',
    hi: 'सिफारिशें प्राप्त करने में त्रुटि। कृपया बाद में पुनः प्रयास करें।',
    kn: 'ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ದೋಷ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ.',
    te: 'సిఫార్సులు పొందడంలో లోపం. దయచేసి తర్వాత ప్రయత్నించండి.'
  };
  container.textContent = translate(errorText);
  console.error('API Error:', error);
}

// Fetch fertilizer recommendations from real API with error handling and loading state
async function fetchFertilizerRecommendations(cropId, growthStageId) {
  showLoading();
  try {
    // Construct query parameters
    const params = new URLSearchParams({ crop: cropId, stage: growthStageId, lang: currentLanguage });
    const response = await fetch(`${API_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    // Expected response format: [{ fertilizer: 'Urea', amount: '50 kg/ha', tooltip: '...' }, ...]
    const data = await response.json();

    // Validate data format (basic check)
    if (!Array.isArray(data)) {
      throw new Error('Invalid API response format');
    }

    return data;
  } catch (error) {
    showError(error);
    return [];
  }
}

// Display fertilizer recommendations with tooltips and voice guidance
function displayRecommendations(recommendations) {
  const container = document.getElementById('recommendations');
  container.innerHTML = '';

  if (recommendations.length === 0) {
    const noRecText = {
      en: 'No recommendations available.',
      es: 'No hay recomendaciones disponibles.',
      hi: 'कोई सिफारिश उपलब्ध नहीं है।',
      kn: 'ಯಾವುದೇ ಶಿಫಾರಸುಗಳು ಲಭ್ಯವಿಲ್ಲ.',
      te: 'ఏ సిఫార్సులు అందుబాటులో లేవు.'
    };
    container.textContent = translate(noRecText);
    return;
  }

  const ul = document.createElement('ul');
  recommendations.forEach(rec => {
    const li = document.createElement('li');
    li.textContent = `${rec.fertilizer}${rec.amount ? ' - ' + rec.amount : ''}`;

    // Add tooltip for fertilizer recommendation if available
    if (rec.tooltip) {
      li.setAttribute('title', rec.tooltip);
      li.classList.add('tooltip'); // For styling if needed
    }

    ul.appendChild(li);
  });
  container.appendChild(ul);
}

// Handle nutrient deficiency: show solution, tooltip, voice, and Help Bot message
function handleNutrientDeficiency(nutrient) {
  const container = document.getElementById('deficiency-solution');
  const solutionText = nutrientDeficiencySolutions[nutrient];

  if (!solutionText) {
    const noSolutionText = {
      en: 'No solution available.',
      es: 'No hay solución disponible.',
      hi: 'कोई समाधान उपलब्ध नहीं है।',
      kn: 'ಯಾವುದೇ ಪರಿಹಾರ ಲಭ್ಯವಿಲ್ಲ.',
      te: 'ఏ పరిష్కారం అందుబాటులో లేదు.'
    };
    container.textContent = translate(noSolutionText);
    speakText(translate(noSolutionText));
    HelpBotSendMessage(translate(noSolutionText));
    HelpBotVoice(translate(noSolutionText));
    return;
  }

  const translatedText = translate(solutionText);
  container.textContent = translatedText;

  // Add tooltip to deficiency solution container for additional info
  container.setAttribute('title', translatedText);
  container.classList.add('tooltip');

  // Voice guidance for deficiency solution
  speakText(translatedText);

  // Enhanced Help Bot integration: show message and voice
  HelpBotSendMessage(translatedText);
  HelpBotVoice(translatedText);
}

// Utilize Web Speech API to speak text in selected language
function speakText(text) {
  if (!('speechSynthesis' in window)) return;

  // Cancel any ongoing speech to avoid overlap
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Set language code for speech synthesis
  switch (currentLanguage) {
    case 'es':
      utterance.lang = 'es-ES';
      break;
    case 'hi':
      utterance.lang = 'hi-IN';
      break;
    case 'kn':
      utterance.lang = 'kn-IN';
      break;
    case 'te':
      utterance.lang = 'te-IN';
      break;
    default:
      utterance.lang = 'en-US';
  }

  speechSynthesis.speak(utterance);
}

// Enhanced Help Bot integration: display message in chat UI and log
function HelpBotSendMessage(message) {
  // Assuming there is a chat container with id 'helpbot-chat'
  const chatContainer = document.getElementById('helpbot-chat');
  if (chatContainer) {
    const messageElem = document.createElement('div');
    messageElem.className = 'helpbot-message';
    messageElem.textContent = message;
    chatContainer.appendChild(messageElem);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to latest message
  }
  // Also log for debugging
  console.log('HelpBotSendMessage:', message);
}

// Enhanced Help Bot voice output integration
function HelpBotVoice(message) {
  // Here we reuse speakText for Help Bot voice output
  speakText(message);
  console.log('HelpBotVoice:', message);
}

// Event handler for crop selection change
function onCropChange() {
  const cropSelect = document.getElementById('crop-select');
  const selectedCrop = cropSelect.value;
  populateGrowthStageSelect(selectedCrop);
  // Automatically select first growth stage if available
  const stageSelect = document.getElementById('growth-stage-select');
  if (stageSelect.options.length > 0) {
    stageSelect.selectedIndex = 0;
  }
  updateRecommendations();
}

// Event handler for growth stage selection change
function onGrowthStageChange() {
  updateRecommendations();
}

// Update fertilizer recommendations based on selected crop and growth stage
async function updateRecommendations() {
  const cropSelect = document.getElementById('crop-select');
  const stageSelect = document.getElementById('growth-stage-select');
  const cropId = cropSelect.value;
  const stageId = stageSelect.value;

  if (!cropId || !stageId) {
    displayRecommendations([]);
    return;
  }

  const recommendations = await fetchFertilizerRecommendations(cropId, stageId);
  displayRecommendations(recommendations);

  // Prepare combined recommendation text for voice and Help Bot
  const recText = recommendations.map(r => `${r.fertilizer}${r.amount ? ' - ' + r.amount : ''}`).join(', ');

  if (recText) {
    speakText(recText);
    HelpBotSendMessage(recText);
    HelpBotVoice(recText);
  }
}

// Initialize UI components and event listeners
function initialize() {
  populateCropSelect();

  const cropSelect = document.getElementById('crop-select');
  const stageSelect = document.getElementById('growth-stage-select');

  cropSelect.addEventListener('change', onCropChange);
  stageSelect.addEventListener('change', onGrowthStageChange);

  // Initialize growth stages for the first crop and fetch recommendations
  if (cropSelect.options.length > 0) {
    cropSelect.selectedIndex = 0;
    onCropChange();
  }

  // Attach event listeners to deficiency buttons with data-deficiency attribute
  const deficiencyButtons = document.querySelectorAll('[data-deficiency]');
  deficiencyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const nutrient = btn.getAttribute('data-deficiency');
      handleNutrientDeficiency(nutrient);
    });
  });

  // Optional: Setup language selector if exists
  const languageSelector = document.getElementById('language-select');
  if (languageSelector) {
    languageSelector.value = currentLanguage;
    languageSelector.addEventListener('change', (e) => {
      currentLanguage = e.target.value;
      // Re-populate selects and update UI texts on language change
      populateCropSelect();
      onCropChange();
      // Clear deficiency solution and recommendations to avoid stale text
      document.getElementById('deficiency-solution').textContent = '';
    });
  }
}

// This script is intended to be run only in the browser via a <script> tag in an EJS template.
// Do not run this file directly in Node.js (e.g., with `node fertilizers.js`), as it depends on browser globals like `document`.
