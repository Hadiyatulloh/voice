const mainInput = document.getElementById('mainInput');
const speakBtn = document.getElementById('speakBtn');
const volumeSlider = document.getElementById('volumeSlider');
const rateSlider = document.getElementById('rateSlider');
const pitchSlider = document.getElementById('pitchSlider');
const volumeValue = document.getElementById('volumeValue');
const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');

// Function to update the slider background
function updateSliderBackground(slider, value, min, max, color1 = '#1e90ff', color2 = '#444') {
    const percent = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, ${color1} ${percent}%, ${color2} ${percent}%)`;
}

// Initial slider background updates
updateSliderBackground(volumeSlider, volumeSlider.value, 0, 1);
updateSliderBackground(rateSlider, rateSlider.value, 0.1, 2);
updateSliderBackground(pitchSlider, pitchSlider.value, 0, 2);

// Update volume value and slider background on input change
volumeSlider.addEventListener('input', () => {
    const value = parseFloat(volumeSlider.value);
    volumeValue.textContent = `${Math.round(value * 100)}%`;
    updateSliderBackground(volumeSlider, value, 0, 1);
});

// Update rate value and slider background on input change
rateSlider.addEventListener('input', () => {
    const value = parseFloat(rateSlider.value);
    rateValue.textContent = `${value.toFixed(1)}x`;
    updateSliderBackground(rateSlider, value, 0.1, 2);
});

// Update pitch value and slider background on input change
pitchSlider.addEventListener('input', () => {
    const value = parseFloat(pitchSlider.value);
    pitchValue.textContent = `${value.toFixed(1)}x`;
    updateSliderBackground(pitchSlider, value, 0, 2);
});

// Speak the text when the button is clicked
speakBtn.addEventListener('click', () => {
    const text = mainInput.value.trim();
    if (text !== '') {
        const utterance = new SpeechSynthesisUtterance(text);
        // Set initial volume, rate, and pitch
        utterance.volume = parseFloat(volumeSlider.value);
        utterance.rate = parseFloat(rateSlider.value);
        utterance.pitch = parseFloat(pitchSlider.value);
        speechSynthesis.speak(utterance);
    }
});