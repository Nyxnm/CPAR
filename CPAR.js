const audioMap = {

    one : "JOYFUL.mp3",
    two: "HISTORICAL.mp3",
    three : "KURATSA.mp3"
}

const playingAudios = {};


// Function to fade out a single audio
function fadeOutAudio(audio, button) {
    if (!audio) return;
    let fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
            audio.volume -= 0.05; // gradually reduce volume
        } else {
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 1; // reset for next play
            if (button) button.classList.remove("playing"); // reset button color
            clearInterval(fadeInterval);
        }
    }, 100); // every 100ms
}

// Set up buttons
for (let id in audioMap) {
    const button = document.getElementById(id);

    button.addEventListener("click", () => {
        const currentAudio = playingAudios[id];

        if (currentAudio && !currentAudio.paused) {
            // Fade out if already playing
            fadeOutAudio(currentAudio, button);
            playingAudios[id] = null;
        } else {
            // Play new audio without stopping others
            const audio = new Audio(audioMap[id]);
            playingAudios[id] = audio;
            audio.volume = 1;
            audio.play();
            button.classList.add("playing"); // highlight button

            audio.addEventListener("ended", () => {
                button.classList.remove("playing");
                playingAudios[id] = null;
            });
        }
    });
}

// Mobile STOP button to fade out all sounds
const stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", () => {
    for (let key in playingAudios) {
        if (playingAudios[key]) {
            const btn = document.getElementById(key);
            fadeOutAudio(playingAudios[key], btn);
            playingAudios[key] = null;
        }
    }

});
