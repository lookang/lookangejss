document.addEventListener('DOMContentLoaded', () => {

    const bodyEl = document.body;
    const paragraphContainers = document.querySelectorAll('.paragraph-container');
    const cleanSpeechParagraphs = document.querySelectorAll('#clean-speech-source p');
    
    const playAllBtn = document.getElementById('play-all-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    const pinyinToggle = document.getElementById('toggle-pinyin');
    const translationToggle = document.getElementById('toggle-translation');

    const audioPlayer = document.getElementById('audio-player');
    const mp3PlaybackToggle = document.getElementById('toggle-mp3-playback');
    const mp3ToggleLabel = document.getElementById('mp3-toggle-label');
    let paragraphTimings = []; // To store the loaded timing data for paragraphs

    const synth = window.speechSynthesis;
    let chineseVoice = null;

    let isPlayingAll = false;
    let currentWordSpans = []; // For speech utterance highlighting
    let currentParagraphContainer = null; // For both modes

    // Function to get a Chinese voice (reintroduced)
    const getChineseVoice = () => {
        const voices = synth.getVoices();
        let voice = voices.find(v => v.lang === 'zh-CN' && v.name.includes('Chinese'));
        if (!voice) {
            voice = voices.find(v => v.lang.startsWith('zh') && v.name.includes('Chinese'));
        }
        if (!voice) {
            voice = voices.find(v => v.lang === 'zh-CN');
        }
        return voice;
    };

    // Populate chineseVoice once voices are loaded
    synth.onvoiceschanged = () => {
        chineseVoice = getChineseVoice();
    };

    // If voices are already loaded, get it immediately
    if (synth.getVoices().length > 0) {
        chineseVoice = getChineseVoice();
    }

    // Load timing data for MP3 playback
    fetch('timing.json')
        .then(response => response.json())
        .then(data => {
            paragraphTimings = data.filter(item => item.type !== 'header'); // Filter out header for paragraph highlighting
            console.log('Paragraph timings loaded:', paragraphTimings);
        })
        .catch(error => {
            console.error('Error loading timing data:', error);
            alert("Error loading timing data. MP3 playback highlighting might not work.");
            // playAllBtn.disabled = true; // Don't disable, as speech utterance is still an option
            // document.querySelectorAll('.play-paragraph-btn').forEach(btn => btn.disabled = true);
        });

    const removeWordHighlights = () => {
        document.querySelectorAll('.word-highlight').forEach(span => {
            span.classList.remove('word-highlight');
        });
    };

    const removeParagraphHighlights = () => {
        document.querySelectorAll('.paragraph-container.highlight').forEach(p => {
            p.classList.remove('highlight');
        });
    };

    const stopPlayback = () => {
        isPlayingAll = false;
        synth.cancel(); // Cancel speech utterance
        audioPlayer.pause(); // Pause MP3
        audioPlayer.currentTime = 0; // Reset MP3 time
        removeParagraphHighlights();
        removeWordHighlights();
        playAllBtn.textContent = '▶ Play All';
        currentWordSpans = [];
        currentParagraphContainer = null;
    };

    // Web Speech API playback function (reintroduced and modified)
    const speakUtterance = (text, paragraphContainer, wordSpans, onEndCallback) => {
        stopPlayback(); // Stop any ongoing playback (MP3 or speech)

        currentParagraphContainer = paragraphContainer;
        currentWordSpans = Array.from(wordSpans); // Convert NodeList to Array
        currentParagraphContainer.classList.add('highlight');

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        if (chineseVoice) {
            utterance.voice = chineseVoice;
        }
        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onboundary = (event) => {
            removeWordHighlights();
            let charCount = 0;
            for (const span of currentWordSpans) {
                if (event.charIndex < charCount + span.textContent.length) {
                    span.classList.add('word-highlight');
                    break;
                }
                charCount += span.textContent.length;
            }
        };

        utterance.onend = () => {
            removeParagraphHighlights();
            removeWordHighlights();
            currentParagraphContainer = null;
            currentWordSpans = [];
            if (typeof onEndCallback === 'function') {
                onEndCallback();
            }
            if (!isPlayingAll) {
                playAllBtn.textContent = '▶ Play All';
            }
        };
        
        utterance.onerror = (event) => console.error('SpeechSynthesisUtterance.onerror', event);
        synth.speak(utterance);
    };

    // MP3 playback function (modified for paragraph highlighting)
    const playMp3Segment = (paragraphIndex, onEndCallback) => {
        stopPlayback(); // Stop any ongoing playback (MP3 or speech)

        currentParagraphContainer = paragraphContainers[paragraphIndex];
        currentParagraphContainer.classList.add('highlight');

        const timingData = paragraphTimings.find(t => t.paragraph_index === paragraphIndex);

        if (!timingData) {
            console.warn(`No timing data found for paragraph ${paragraphIndex} for MP3 playback.`);
            onEndCallback();
            return;
        }

        audioPlayer.currentTime = timingData.start;
        audioPlayer.play();

        const handleMp3TimeUpdate = () => {
            const currentTime = audioPlayer.currentTime;
            if (currentTime >= timingData.end) {
                audioPlayer.pause();
                audioPlayer.removeEventListener('timeupdate', handleMp3TimeUpdate);
                removeParagraphHighlights();
                currentParagraphContainer = null;
                if (typeof onEndCallback === 'function') {
                    onEndCallback();
                }
                if (!isPlayingAll) {
                    playAllBtn.textContent = '▶ Play All';
                }
            }
        };

        audioPlayer.addEventListener('timeupdate', handleMp3TimeUpdate);
        audioPlayer.onerror = (event) => console.error('Audio playback error:', event);
    };
    
    // "Play All" Logic (modified for conditional playback)
    const playAllParagraphs = (index = 0) => {
        if (!isPlayingAll || index >= paragraphContainers.length) {
            stopPlayback();
            return;
        }

        const container = paragraphContainers[index];
        playAllBtn.textContent = `❚❚ Playing ${index + 1}/${paragraphContainers.length}`;

        if (mp3PlaybackToggle.checked) {
            playMp3Segment(index, () => {
                playAllParagraphs(index + 1);
            });
        } else {
            const text = cleanSpeechParagraphs[index].textContent.trim();
            const wordSpans = container.querySelectorAll('.chinese-line span');
            speakUtterance(text, container, wordSpans, () => {
                playAllParagraphs(index + 1);
            });
        }
    };

    // Event Listeners (modified for conditional playback)
    paragraphContainers.forEach((container, index) => {
        const playBtn = container.querySelector('.play-paragraph-btn');
        playBtn.addEventListener('click', () => {
            isPlayingAll = false; // Ensure single paragraph play doesn't trigger "play all" mode
            if (mp3PlaybackToggle.checked) {
                playMp3Segment(index);
            } else {
                const text = cleanSpeechParagraphs[index].textContent.trim();
                const wordSpans = container.querySelectorAll('.chinese-line span');
                speakUtterance(text, container, wordSpans);
            }
        });
    });

    playAllBtn.addEventListener('click', () => {
        if (isPlayingAll) stopPlayback();
        else {
            isPlayingAll = true;
            playAllParagraphs(0);
        }
    });

    stopBtn.addEventListener('click', stopPlayback);
    
    resetBtn.addEventListener('click', () => {
        stopPlayback();
        pinyinToggle.checked = false;
        translationToggle.checked = false;
        mp3PlaybackToggle.checked = false; // Uncheck new MP3 toggle
        pinyinToggle.dispatchEvent(new Event('change'));
        translationToggle.dispatchEvent(new Event('change'));
        mp3PlaybackToggle.dispatchEvent(new Event('change')); // Dispatch change for MP3 toggle
    });

    pinyinToggle.addEventListener('change', () => bodyEl.classList.toggle('pinyin-visible', pinyinToggle.checked));
    translationToggle.addEventListener('change', () => bodyEl.classList.toggle('translation-visible', translationToggle.checked));
    // New event listener for MP3 playback toggle
    // Initial label setup based on default unchecked state
    mp3ToggleLabel.childNodes[1].nodeValue = ' Play MP3 ?';

    mp3PlaybackToggle.addEventListener('change', () => {
        stopPlayback(); // Stop any playback when mode changes
        if (mp3PlaybackToggle.checked) {
            mp3ToggleLabel.childNodes[1].nodeValue = ' Play Web Speech API ?'; // If checked (MP3 active), suggest Web Speech API
        } else {
            mp3ToggleLabel.childNodes[1].nodeValue = ' Play MP3 ?'; // If unchecked (Web Speech API active), suggest MP3
        }
    });

    window.addEventListener('beforeunload', () => {
        synth.cancel(); // Cancel speech utterance
        audioPlayer.pause(); // Pause MP3
    });
});
