

// public/javascripts/sellcrops-client.js

// Language strings
const translations = {
  en: {
    cropType: "Crop Type",
    quantity: "Quantity (kg)",
    location: "Location",
    useMyLocation: "Use My Location",
    submit: "Find Markets",
    loading: "Loading...",
    error: "An error occurred. Please try again.",
    nearestMarkets: "Nearest Markets",
    priceTrends: "Price Trends",
    profitPotential: "Profit Potential",
    helpBot: "Help Bot",
    voiceGuide: "Voice Guidance",
    enterLocation: "Enter your location manually or use geolocation.",
    selectCrop: "Select a crop type",
    enterQuantity: "Enter quantity",
    helpBotMsg: "Welcome! I can assist you in selling your crops. Choose your crop, enter quantity, and location. Click 'Find Markets' to see the best options.",
    voiceOn: "Voice guidance is ON.",
    voiceOff: "Voice guidance is OFF."
  },
  hi: {
    cropType: "फसल का प्रकार",
    quantity: "मात्रा (किग्रा)",
    location: "स्थान",
    useMyLocation: "मेरा स्थान उपयोग करें",
    submit: "बाजार खोजें",
    loading: "लोड हो रहा है...",
    error: "कोई त्रुटि हुई। कृपया पुनः प्रयास करें।",
    nearestMarkets: "नजदीकी बाजार",
    priceTrends: "मूल्य प्रवृत्तियाँ",
    profitPotential: "लाभ क्षमता",
    helpBot: "सहायता बॉट",
    voiceGuide: "वॉइस गाइडेंस",
    enterLocation: "स्थान मैन्युअल रूप से दर्ज करें या जियोलोकेशन का उपयोग करें।",
    selectCrop: "फसल का चयन करें",
    enterQuantity: "मात्रा दर्ज करें",
    helpBotMsg: "स्वागत है! मैं आपकी फसल बेचने में सहायता कर सकता हूँ। फसल चुनें, मात्रा और स्थान दर्ज करें, 'बाजार खोजें' पर क्लिक करें।",
    voiceOn: "वॉइस गाइडेंस चालू है।",
    voiceOff: "वॉइस गाइडेंस बंद है।"
  },
  kn: {
    cropType: "ಬೆಳೆ ಪ್ರಕಾರ",
    quantity: "ಪ್ರಮಾಣ (ಕೆಜಿ)",
    location: "ಸ್ಥಳ",
    useMyLocation: "ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    submit: "ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    error: "ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    nearestMarkets: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳು",
    priceTrends: "ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳು",
    profitPotential: "ಲಾಭ ಸಾಧ್ಯತೆ",
    helpBot: "ಸಹಾಯ ಬಾಟ್",
    voiceGuide: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ",
    enterLocation: "ಸ್ಥಳವನ್ನು ಕೈಯಾರೆ ನಮೂದಿಸಿ ಅಥವಾ ಜಿಯೊಲೊಕೆಷನ್ ಬಳಸಿ.",
    selectCrop: "ಬೆಳೆ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
    enterQuantity: "ಪ್ರಮಾಣವನ್ನು ನಮೂದಿಸಿ",
    helpBotMsg: "ಸ್ವಾಗತ! ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ಮಾರಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ, ಪ್ರಮಾಣ ಮತ್ತು ಸ್ಥಳ ನಮೂದಿಸಿ, 'ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
    voiceOn: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಆನ್ ಇದೆ.",
    voiceOff: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಆಫ್ ಇದೆ."
  },
  te: {
    cropType: "పంట రకం",
    quantity: "పరిమాణం (కిలోలు)",
    location: "స్థానం",
    useMyLocation: "నా స్థానాన్ని ఉపయోగించు",
    submit: "మార్కెట్లు కనుగొనండి",
    loading: "లోడ్ అవుతోంది...",
    error: "లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    nearestMarkets: "సమీప మార్కెట్లు",
    priceTrends: "ధర ప్రవణతలు",
    profitPotential: "లాభ అవకాశాలు",
    helpBot: "సహాయక బాట్",
    voiceGuide: "వాయిస్ మార్గదర్శనం",
    enterLocation: "మీ స్థానాన్ని మాన్యువల్‌గా నమోదు చేయండి లేదా జియోలొకేషన్ ఉపయోగించండి.",
    selectCrop: "పంట రకాన్ని ఎంచుకోండి",
    enterQuantity: "పరిమాణాన్ని నమోదు చేయండి",
    helpBotMsg: "స్వాగతం! మీ పంటలను అమ్మడంలో నేను సహాయపడతాను. పంటను ఎంచుకోండి, పరిమాణం మరియు స్థానాన్ని నమోదు చేయండి, 'మార్కెట్లు కనుగొనండి' క్లిక్ చేయండి.",
    voiceOn: "వాయిస్ మార్గదర్శనం ఆన్ లో ఉంది.",
    voiceOff: "వాయిస్ మార్గదర్శనం ఆఫ్ లో ఉంది."
  }
};

// Supported crops (could be dynamic, hardcoded for now)
const crops = [
  { value: "wheat", label: { en: "Wheat", hi: "गेहूं", kn: "ಗೋಧಿ", te: "గోధుమ" } },
  { value: "rice", label: { en: "Rice", hi: "चावल", kn: "ಅಕ್ಕಿ", te: "బియ్యం" } },
  { value: "maize", label: { en: "Maize", hi: "मक्का", kn: "ಮೆಕ್ಕೆಜೋಳ", te: "మక్కజొన్న" } },
  { value: "cotton", label: { en: "Cotton", hi: "कपास", kn: "ಹತ್ತಿ", te: "పత్తి" } },
  { value: "sugarcane", label: { en: "Sugarcane", hi: "गन्ना", kn: "ಇಕ್ಕರೆ", te: "చెరకు" } }
];

const getText = (key) => {
  const lang = window.currentLanguage || "en";
  return translations[lang][key] || translations["en"][key] || key;
};

const getCropLabel = (crop) => {
  const lang = window.currentLanguage || "en";
  return crop.label[lang] || crop.label["en"];
};

function speak(text) {
  if (!window.speechSynthesis) return;
  const lang = window.currentLanguage || "en";
  let voice = null;
  for (const v of window.speechSynthesis.getVoices()) {
    if (v.lang.toLowerCase().startsWith(lang)) {
      voice = v;
      break;
    }
  }
  const utter = new window.SpeechSynthesisUtterance(text);
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

document.addEventListener("DOMContentLoaded", function () {
  // Main container
  const container = document.getElementById("sellcrops-app") || document.body;
  container.innerHTML = `
    <div id="sellcrops-form-wrap">
      <h2>${getText("helpBot")}</h2>
      <div id="helpbot-msg" class="helpbot-msg"></div>
      <button id="voice-toggle" type="button">${getText("voiceGuide")}</button>
      <form id="sellcrops-form" autocomplete="off">
        <label>
          ${getText("cropType")}
          <select id="crop-type" required>
            <option value="">${getText("selectCrop")}</option>
          </select>
        </label>
        <label>
          ${getText("quantity")}
          <input id="quantity" type="number" min="1" required placeholder="${getText("enterQuantity")}" />
        </label>
        <label>
          ${getText("location")}
          <input id="location" type="text" required placeholder="${getText("enterLocation")}" />
          <button id="geolocate-btn" type="button">${getText("useMyLocation")}</button>
        </label>
        <button id="submit-btn" type="submit">${getText("submit")}</button>
      </form>
      <div id="loading" style="display:none">${getText("loading")}</div>
      <div id="error-msg" class="error-msg" style="display:none"></div>
      <div id="results"></div>
    </div>
  `;

  // Populate crop select
  const cropSelect = document.getElementById("crop-type");
  crops.forEach(crop => {
    const opt = document.createElement("option");
    opt.value = crop.value;
    opt.textContent = getCropLabel(crop);
    cropSelect.appendChild(opt);
  });

  // Help Bot initial message
  const helpbotMsg = document.getElementById("helpbot-msg");
  let voiceEnabled = false;
  function showHelpBot(msg) {
    helpbotMsg.textContent = msg;
    if (voiceEnabled) speak(msg);
  }
  showHelpBot(getText("helpBotMsg"));

  // Voice guidance toggle
  const voiceBtn = document.getElementById("voice-toggle");
  voiceBtn.addEventListener("click", function () {
    voiceEnabled = !voiceEnabled;
    if (voiceEnabled) {
      showHelpBot(getText("voiceOn"));
      setTimeout(() => showHelpBot(getText("helpBotMsg")), 1200);
    } else {
      showHelpBot(getText("voiceOff"));
    }
  });

  // Geolocation handler
  const geoBtn = document.getElementById("geolocate-btn");
  const locationInput = document.getElementById("location");
  geoBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!navigator.geolocation) {
      showError(getText("error") + " (Geolocation not supported)");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        locationInput.value = `${latitude.toFixed(5)},${longitude.toFixed(5)}`;
        setLoading(false);
        showHelpBot(getText("location") + ": " + locationInput.value);
      },
      err => {
        setLoading(false);
        showError(getText("error") + " (Geolocation failed)");
      }
    );
  });

  // Form submission
  const form = document.getElementById("sellcrops-form");
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error-msg");
  const resultsDiv = document.getElementById("results");

  function setLoading(loading) {
    loadingDiv.style.display = loading ? "block" : "none";
    form.querySelectorAll("input,select,button").forEach(el => el.disabled = loading);
  }
  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = "block";
    if (voiceEnabled) speak(msg);
  }
  function clearError() {
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
  }
  function showResults(data) {
    // data: { markets: [], priceTrends: [], profitPotential: string/number }
    let html = "";
    if (data.markets && data.markets.length) {
      html += `<h3>${getText("nearestMarkets")}</h3><ul>`;
      data.markets.forEach(mkt => {
        html += `<li><b>${mkt.name}</b> (${mkt.distance} km) - ₹${mkt.price}/kg</li>`;
      });
      html += "</ul>";
    }
    if (data.priceTrends && data.priceTrends.length) {
      html += `<h3>${getText("priceTrends")}</h3><ul>`;
      data.priceTrends.forEach(trend => {
        html += `<li>${trend.date}: ₹${trend.price}/kg</li>`;
      });
      html += "</ul>";
    }
    if (data.profitPotential) {
      html += `<h3>${getText("profitPotential")}</h3><div><b>₹${data.profitPotential}</b></div>`;
    }
    resultsDiv.innerHTML = html;
    if (voiceEnabled && html) {
      let summary = "";
      if (data.markets && data.markets.length) {
        summary += `${getText("nearestMarkets")}: `;
        summary += data.markets.map(m => `${m.name}, ${m.distance} kilometers, Rupees ${m.price} per kilogram`).join(". ");
      }
      if (data.profitPotential) {
        summary += `. ${getText("profitPotential")}: Rupees ${data.profitPotential}`;
      }
      speak(summary);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();
    resultsDiv.innerHTML = "";
    const cropType = cropSelect.value;
    const quantity = document.getElementById("quantity").value;
    const location = locationInput.value;
    if (!cropType || !quantity || !location) {
      showError(getText("error"));
      return;
    }
    setLoading(true);
    fetch("/api/market", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cropType, quantity, location })
    })
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(data => {
        setLoading(false);
        if (data.error) {
          showError(data.error);
        } else {
          showResults(data);
        }
      })
      .catch(err => {
        setLoading(false);
        showError(getText("error"));
      });
  });

});