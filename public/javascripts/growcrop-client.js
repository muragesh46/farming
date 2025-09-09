

// public/javascripts/growcrop-client.js

// Text translations for supported labels
const translations = {
  en: {
    loading: "Loading location and data...",
    error_location: "Unable to retrieve your location.",
    error_api: "Could not fetch data from server.",
    soil: "Soil",
    moisture: "Moisture",
    ph: "pH",
    rainfall: "Rainfall",
    temperature: "Temperature",
    humidity: "Humidity",
    wind_speed: "Wind Speed",
    solar_radiation: "Solar Radiation",
    help_bot_greet: "Hi! I'm your GrowCrop Help Bot. Ask me about the data or how to use this page.",
    help_bot_voice: "Voice guidance enabled.",
    help_bot_error: "Sorry, I didn't understand that. Try asking about soil, weather, or how to use this page.",
  },
  // Add more languages as needed
  hi: {
    loading: "स्थान और डेटा लोड हो रहा है...",
    error_location: "आपका स्थान प्राप्त नहीं किया जा सका।",
    error_api: "सर्वर से डेटा प्राप्त नहीं कर सके।",
    soil: "मिट्टी",
    moisture: "नमी",
    ph: "पीएच",
    rainfall: "वर्षा",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    wind_speed: "पवन गति",
    solar_radiation: "सौर विकिरण",
    help_bot_greet: "नमस्ते! मैं आपका GrowCrop हेल्प बॉट हूँ। डेटा या इस पृष्ठ के उपयोग के बारे में पूछें।",
    help_bot_voice: "वॉयस गाइडेंस सक्षम है।",
    help_bot_error: "माफ़ कीजिए, मैं समझ नहीं पाया। मिट्टी, मौसम या उपयोग के बारे में पूछें।",
  }
};

function t(key) {
  const lang = window.currentLanguage || "en";
  return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
}

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Insert loading state
  let container = document.getElementById("growcrop-data");
  if (!container) {
    container = document.createElement("div");
    container.id = "growcrop-data";
    document.body.prepend(container);
  }
  container.innerHTML = `<div id="growcrop-loading">${t("loading")}</div>`;

  // Insert Help Bot UI
  let helpBot = document.getElementById("growcrop-helpbot");
  if (!helpBot) {
    helpBot = document.createElement("div");
    helpBot.id = "growcrop-helpbot";
    helpBot.style = "position:fixed;bottom:20px;right:20px;z-index:1000;background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 2px 8px rgba(0,0,0,0.2);max-width:320px;";
    helpBot.innerHTML = `
      <div id="helpbot-messages" style="font-size:1em;min-height:36px;margin-bottom:10px;">${t("help_bot_greet")}</div>
      <form id="helpbot-form" style="display:flex;gap:4px;">
        <input type="text" id="helpbot-input" autocomplete="off" placeholder="Ask me..." style="flex:1;padding:5px 8px;border-radius:5px;border:1px solid #ccc;">
        <button type="submit" style="padding:5px 10px;border-radius:5px;background:#4caf50;color:#fff;border:none;">Send</button>
      </form>
      <button id="helpbot-voice" style="margin-top:8px;background:none;border:none;color:#4caf50;cursor:pointer;">🔊</button>
    `;
    document.body.appendChild(helpBot);
  }

  // Help Bot logic
  const helpInput = helpBot.querySelector("#helpbot-input");
  const helpForm = helpBot.querySelector("#helpbot-form");
  const helpMsg = helpBot.querySelector("#helpbot-messages");
  const helpVoiceBtn = helpBot.querySelector("#helpbot-voice");
  let lastData = null;
  function helpBotReply(msg) {
    helpMsg.textContent = msg;
    // Optional: Voice guidance
    if (helpBot.voiceEnabled) {
      const utter = new window.SpeechSynthesisUtterance(msg);
      utter.lang = window.currentLanguage === "hi" ? "hi-IN" : "en-US";
      window.speechSynthesis.speak(utter);
    }
  }
  helpBot.voiceEnabled = false;
  helpVoiceBtn.addEventListener("click", function () {
    helpBot.voiceEnabled = !helpBot.voiceEnabled;
    helpVoiceBtn.style.color = helpBot.voiceEnabled ? "#2196f3" : "#4caf50";
    helpBotReply(t("help_bot_voice"));
  });
  helpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const q = (helpInput.value || "").toLowerCase();
    // Basic keyword matching
    if (/soil/.test(q) || /मिट्टी/.test(q)) {
      if (lastData && lastData.soil) helpBotReply(`${t("soil")}: ${lastData.soil}`);
      else helpBotReply(t("loading"));
    } else if (/moisture/.test(q) || /नमी/.test(q)) {
      if (lastData && lastData.moisture!=null) helpBotReply(`${t("moisture")}: ${lastData.moisture}`);
      else helpBotReply(t("loading"));
    } else if (/p[Hh]/.test(q) || /पीएच/.test(q)) {
      if (lastData && lastData.ph!=null) helpBotReply(`${t("ph")}: ${lastData.ph}`);
      else helpBotReply(t("loading"));
    } else if (/rain|वर्षा/.test(q)) {
      if (lastData && lastData.rainfall!=null) helpBotReply(`${t("rainfall")}: ${lastData.rainfall}`);
      else helpBotReply(t("loading"));
    } else if (/temp|तापमान/.test(q)) {
      if (lastData && lastData.temperature!=null) helpBotReply(`${t("temperature")}: ${lastData.temperature}`);
      else helpBotReply(t("loading"));
    } else if (/humidity|आर्द्रता/.test(q)) {
      if (lastData && lastData.humidity!=null) helpBotReply(`${t("humidity")}: ${lastData.humidity}`);
      else helpBotReply(t("loading"));
    } else if (/wind|पवन/.test(q)) {
      if (lastData && lastData.wind_speed!=null) helpBotReply(`${t("wind_speed")}: ${lastData.wind_speed}`);
      else helpBotReply(t("loading"));
    } else if (/solar|सौर/.test(q)) {
      if (lastData && lastData.solar_radiation!=null) helpBotReply(`${t("solar_radiation")}: ${lastData.solar_radiation}`);
      else helpBotReply(t("loading"));
    } else if (/how|use|कैसे/.test(q)) {
      helpBotReply(t("help_bot_greet"));
    } else {
      helpBotReply(t("help_bot_error"));
    }
    helpInput.value = "";
  });

  // Geolocation
  if (!navigator.geolocation) {
    container.innerHTML = `<div class="growcrop-error">${t("error_location")}</div>`;
    return;
  }
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetchBhuvanData(lat, lon);
    },
    function () {
      container.innerHTML = `<div class="growcrop-error">${t("error_location")}</div>`;
    }
  );

  // Fetch from /api/bhuvan
  function fetchBhuvanData(lat, lon) {
    container.innerHTML = `<div id="growcrop-loading">${t("loading")}</div>`;
    fetch(`/api/bhuvan?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`)
      .then(resp => {
        if (!resp.ok) throw new Error("API error");
        return resp.json();
      })
      .then(data => {
        lastData = data;
        renderData(data);
      })
      .catch(() => {
        container.innerHTML = `<div class="growcrop-error">${t("error_api")}</div>`;
      });
  }

  function renderData(data) {
    // Display all the key info
    container.innerHTML = `
      <div class="growcrop-info" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:400px;">
        <div><b>${t("soil")}:</b> ${data.soil ?? "-"}</div>
        <div><b>${t("moisture")}:</b> ${data.moisture ?? "-"}</div>
        <div><b>${t("ph")}:</b> ${data.ph ?? "-"}</div>
        <div><b>${t("rainfall")}:</b> ${data.rainfall ?? "-"}</div>
        <div><b>${t("temperature")}:</b> ${data.temperature ?? "-"}</div>
        <div><b>${t("humidity")}:</b> ${data.humidity ?? "-"}</div>
        <div><b>${t("wind_speed")}:</b> ${data.wind_speed ?? "-"}</div>
        <div><b>${t("solar_radiation")}:</b> ${data.solar_radiation ?? "-"}</div>
      </div>
    `;
  }
});