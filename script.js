var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const result = document.querySelector('.output');
const loading = document.getElementById('loading');
const status = document.getElementById('status');
const btn = document.getElementById('startRecognition');

function testSpeech() {
    btn.disabled = true;
    result.textContent = '';

    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    status.textContent = 'Розпізнавання...'

    recognition.addEventListener('soundend', () => {
        recognition.stop();
    });
    recognition.addEventListener('result', event => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        result.textContent = 'Ви сказали: ' + speechResult;
        status.textContent = `Натисніть на кнопку, щоб почати голосовий пошук`;
        btn.disabled = false;
        setTimeout(() => {
            window.location = `https://www.google.com/search?q=${speechResult}`
        }, 1000)
    });
    recognition.addEventListener('error', event => {
        result.textContent = "Ми вас не почули, повторіть, будь ласка, ще раз!";
        status.textContent = "Натисніть на кнопку, щоб почати голосовий пошук";
        btn.disabled = false;
        console.log(event.error);
    })
}

btn.addEventListener('click', testSpeech);