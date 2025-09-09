

// fertilizers-client.js
document.addEventListener('DOMContentLoaded', function() {
    // Language support
    const languages = {
        en: {
            selectCrop: "Select Crop Type",
            selectStage: "Select Growth Stage",
            getRecommendations: "Get Recommendations",
            fertilizerRecommendations: "Fertilizer Recommendations",
            deficiencySolutions: "Nutrient Deficiency Solutions",
            loading: "Loading...",
            error: "An error occurred. Please try again.",
            helpBotPrompt: "How can I assist you with fertilizers?",
            voiceOn: "Voice Guidance On",
            voiceOff: "Voice Guidance Off"
        },
        hi: {
            selectCrop: "फसल का प्रकार चुनें",
            selectStage: "विकास चरण चुनें",
            getRecommendations: "सिफारिशें प्राप्त करें",
            fertilizerRecommendations: "उर्वरक सिफारिशें",
            deficiencySolutions: "पोषक तत्व की कमी के समाधान",
            loading: "लोड हो रहा है...",
            error: "एक त्रुटि हुई। कृपया पुन: प्रयास करें।",
            helpBotPrompt: "मैं उर्वरकों के साथ आपकी कैसे सहायता कर सकता हूँ?",
            voiceOn: "वॉयस मार्गदर्शन चालू",
            voiceOff: "वॉयस मार्गदर्शन बंद"
        },
        kn: {
            selectCrop: "ಬೆಳೆ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
            selectStage: "ವೃದ್ಧಿ ಹಂತ ಆಯ್ಕೆಮಾಡಿ",
            getRecommendations: "ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
            fertilizerRecommendations: "ಸಾರ ಶಿಫಾರಸುಗಳು",
            deficiencySolutions: "ಪೋಷಕಾಂಶ ಕೊರತೆ ಪರಿಹಾರಗಳು",
            loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
            error: "ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.",
            helpBotPrompt: "ನಾನು ಸಾರುಗಳೊಂದಿಗೆ ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
            voiceOn: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಆನ್",
            voiceOff: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಆಫ್"
        },
        te: {
            selectCrop: "పంట రకం ఎంచుకోండి",
            selectStage: "వృద్ధి దశను ఎంచుకోండి",
            getRecommendations: "సిఫార్సులు పొందండి",
            fertilizerRecommendations: "ఎరువుల సిఫార్సులు",
            deficiencySolutions: "పోషక లోప పరిష్కారాలు",
            loading: "లోడ్ అవుతోంది...",
            error: "లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
            helpBotPrompt: "నేను ఎరువులతో మీకు ఎలా సహాయం చేయగలను?",
            voiceOn: "వాయిస్ మార్గదర్శనం ఆన్",
            voiceOff: "వాయిస్ మార్గదర్శనం ఆఫ్"
        }
    };

    function t(key) {
        const lang = window.currentLanguage || 'en';
        return (languages[lang] && languages[lang][key]) || languages['en'][key] || key;
    }

    // Example data for dropdowns
    const cropTypes = [
        { value: '', text: t('selectCrop') },
        { value: 'wheat', text: {en: 'Wheat', hi: 'गेहूं', kn: 'ಗೋಧಿ', te: 'గోధుమ'} },
        { value: 'rice', text: {en: 'Rice', hi: 'चावल', kn: 'ಅಕ್ಕಿ', te: 'బియ్యం'} },
        { value: 'maize', text: {en: 'Maize', hi: 'मक्का', kn: 'ಜೋಳ', te: 'మక్కజొన్న'} }
        // Add more crops as needed
    ];
    const growthStages = [
        { value: '', text: t('selectStage') },
        { value: 'seedling', text: {en: 'Seedling', hi: 'अंकुर', kn: 'ಮೂಲಿಕೆ', te: 'మొక్క'} },
        { value: 'vegetative', text: {en: 'Vegetative', hi: 'वनस्पति', kn: 'ಶಾಖೆ', te: 'వృద్ధి'} },
        { value: 'flowering', text: {en: 'Flowering', hi: 'फूलना', kn: 'ಹೂವು', te: 'పుష్పించటం'} },
        { value: 'maturity', text: {en: 'Maturity', hi: 'परिपक्वता', kn: 'ಪಕ್ವತೆ', te: 'పక్వత'} }
    ];

    // Helper to get text in current language
    function getLocalizedText(option) {
        const lang = window.currentLanguage || 'en';
        if (typeof option.text === 'string') return option.text;
        return option.text[lang] || option.text['en'] || '';
    }

    // Inject container if not present
    let container = document.getElementById('fertilizer-recommendation-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'fertilizer-recommendation-container';
        document.body.appendChild(container);
    }
    container.innerHTML = `
        <div id="fertilizer-form">
            <select id="crop-type"></select>
            <select id="growth-stage"></select>
            <button id="get-recommendations">${t('getRecommendations')}</button>
        </div>
        <div id="loading-message" style="display:none;">${t('loading')}</div>
        <div id="fertilizer-results"></div>
        <div id="deficiency-solutions"></div>
        <div id="help-bot">
            <button id="help-bot-toggle">${t('helpBotPrompt')}</button>
            <div id="help-bot-dialog" style="display:none;">
                <div id="help-bot-messages"></div>
                <input type="text" id="help-bot-input" placeholder="Type your question..." />
                <button id="help-bot-send">Send</button>
                <button id="help-bot-voice">${t('voiceOn')}</button>
            </div>
        </div>
    `;

    // Populate dropdowns
    function populateDropdown(id, options) {
        const sel = document.getElementById(id);
        sel.innerHTML = '';
        options.forEach(opt => {
            const o = document.createElement('option');
            o.value = opt.value;
            o.textContent = getLocalizedText(opt);
            sel.appendChild(o);
        });
    }
    populateDropdown('crop-type', cropTypes);
    populateDropdown('growth-stage', growthStages);

    // Handle form submission
    document.getElementById('get-recommendations').addEventListener('click', function() {
        const crop = document.getElementById('crop-type').value;
        const stage = document.getElementById('growth-stage').value;
        if (!crop || !stage) return;
        showLoading(true);
        fetch('/api/fertilizers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ crop_type: crop, growth_stage: stage, language: window.currentLanguage || 'en' })
        })
        .then(res => res.json())
        .then(data => {
            showLoading(false);
            displayFertilizerRecommendations(data.recommendations || []);
            displayDeficiencySolutions(data.deficiency_solutions || []);
        })
        .catch(() => {
            showLoading(false);
            showError();
        });
    });

    function showLoading(show) {
        document.getElementById('loading-message').style.display = show ? 'block' : 'none';
    }
    function showError() {
        document.getElementById('fertilizer-results').innerHTML = `<div style="color:red">${t('error')}</div>`;
    }
    function displayFertilizerRecommendations(recs) {
        const el = document.getElementById('fertilizer-results');
        if (!recs.length) {
            el.innerHTML = '';
            return;
        }
        let html = `<h3>${t('fertilizerRecommendations')}</h3><ul>`;
        recs.forEach(r => {
            html += `<li>${escapeHTML(r)}</li>`;
        });
        html += '</ul>';
        el.innerHTML = html;
    }
    function displayDeficiencySolutions(solutions) {
        const el = document.getElementById('deficiency-solutions');
        if (!solutions.length) {
            el.innerHTML = '';
            return;
        }
        let html = `<h3>${t('deficiencySolutions')}</h3><ul>`;
        solutions.forEach(s => {
            html += `<li>${escapeHTML(s)}</li>`;
        });
        html += '</ul>';
        el.innerHTML = html;
    }
    function escapeHTML(str) {
        return String(str).replace(/[<>&"']/g, function(m) {
            return ({
                '<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&#39;'
            })[m];
        });
    }

    // Help Bot
    let helpBotVoiceEnabled = false;
    const helpBotToggle = document.getElementById('help-bot-toggle');
    const helpBotDialog = document.getElementById('help-bot-dialog');
    const helpBotMessages = document.getElementById('help-bot-messages');
    const helpBotInput = document.getElementById('help-bot-input');
    const helpBotSend = document.getElementById('help-bot-send');
    const helpBotVoice = document.getElementById('help-bot-voice');

    helpBotToggle.addEventListener('click', function() {
        helpBotDialog.style.display = helpBotDialog.style.display === 'none' ? 'block' : 'none';
    });

    helpBotSend.addEventListener('click', sendHelpBotMessage);
    helpBotInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') sendHelpBotMessage();
    });

    helpBotVoice.addEventListener('click', function() {
        helpBotVoiceEnabled = !helpBotVoiceEnabled;
        helpBotVoice.textContent = helpBotVoiceEnabled ? t('voiceOff') : t('voiceOn');
    });

    function sendHelpBotMessage() {
        const msg = helpBotInput.value.trim();
        if (!msg) return;
        appendBotMessage('user', msg);
        helpBotInput.value = '';
        appendBotMessage('bot', t('loading'));
        fetch('/api/fertilizers/help-bot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message: msg, language: window.currentLanguage || 'en' })
        })
        .then(res => res.json())
        .then(data => {
            helpBotMessages.lastChild.textContent = data.reply || '';
            if (helpBotVoiceEnabled && window.speechSynthesis) {
                speak(data.reply || '');
            }
        })
        .catch(() => {
            helpBotMessages.lastChild.textContent = t('error');
        });
    }
    function appendBotMessage(sender, text) {
        const div = document.createElement('div');
        div.className = sender === 'user' ? 'help-bot-user' : 'help-bot-bot';
        div.textContent = text;
        helpBotMessages.appendChild(div);
        helpBotMessages.scrollTop = helpBotMessages.scrollHeight;
    }
    function speak(text) {
        if (!window.speechSynthesis) return;
        const langMap = {en: 'en-US', hi: 'hi-IN', kn: 'kn-IN', te: 'te-IN'};
        const utter = new window.SpeechSynthesisUtterance(text);
        utter.lang = langMap[window.currentLanguage] || 'en-US';
        window.speechSynthesis.speak(utter);
    }
});