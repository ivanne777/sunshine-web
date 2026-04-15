/* ========================= */
/* NAVIGATION PAGES */
/* ========================= */

function nextPage() { window.location.href = "/suite"; }
function nextPage2() { window.location.href = "/question"; }

/* ========================= */
/* AUDIO MANAGEMENT */
/* ========================= */

let audio = null;
const AUDIO_SRC = "/music/Deca%20OTA%20%20Social%20Housing%20(Visualiser).m4a";

function initMusic() {
    if (audio) return;

    audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.5;

    const lastTime = localStorage.getItem("audioTime");
    if (lastTime) audio.currentTime = parseFloat(lastTime);

    // SAVE POSITION (OPTIMISÉ)
    setInterval(() => {
        if (audio && !audio.paused) {
            localStorage.setItem("audioTime", audio.currentTime);
        }
    }, 3000);

    window.addEventListener("beforeunload", () => {
        if (audio) localStorage.setItem("audioTime", audio.currentTime);
    });
}

function playMusic() {
    initMusic();
    if (!audio) return;

    localStorage.setItem("audioPlaying", "true");

    audio.play().then(() => {
        console.log("Lecture audio démarrée");
    }).catch((err) => {
        console.warn("Autoplay bloqué, attente interaction :", err);
        showAudioSyncOverlay();
    });
}

function stopMusic() {
    if (!audio) return;
    audio.pause();
    localStorage.setItem("audioPlaying", "false");
}

/* ========================= */
/* AUDIO OVERLAY MOBILE SAFE */
/* ========================= */

function showAudioSyncOverlay() {
    if (document.getElementById("audio-sync")) return;

    const sync = document.createElement("div");
    sync.id = "audio-sync";

    sync.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.85);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        backdrop-filter: blur(6px);
        padding: 20px;
    `;

    sync.innerHTML = `
        <h2 style="color: magenta; text-shadow: 0 0 10px magenta; font-size: 1.4rem;">
            Continuer avec la musique ?
        </h2>
        <button style="
            margin-top: 20px;
            background: magenta;
            color: black;
            border: none;
            padding: 15px 35px;
            border-radius: 50px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 0 20px magenta;
        ">
            🎵 Activer le son
        </button>
    `;

    sync.querySelector("button").onclick = () => {
        sync.remove();
        playMusic();
    };

    document.body.appendChild(sync);
}

/* ========================= */
/* INTRO LOGIC */
/* ========================= */

function startIntro() {
    const text1 = document.getElementById("text1");
    const text2 = document.getElementById("text2");
    const text3 = document.getElementById("text3");
    const btn = document.getElementById("discover-btn");

    if (text1) setTimeout(() => text1.classList.add("fade-in"), 500);
    if (text2) setTimeout(() => text2.classList.add("fade-in"), 3500);
    if (text3) setTimeout(() => text3.classList.add("fade-in"), 6500);

    setTimeout(() => {
        if (!btn) return;

        btn.classList.remove("hidden");
        btn.style.opacity = "0";

        setTimeout(() => {
            btn.style.transition = "opacity 1s ease";
            btn.style.opacity = "1";
        }, 100);
    }, 9000);
}

/* ========================= */
/* HEARTS (OPTIMISÉ MOBILE) */
/* ========================= */

function startFallingHearts() {
    const container = document.getElementById("hearts-container");
    if (!container) return;

    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "falling-heart";
        heart.innerHTML = "💜";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-5vh";
        heart.style.fontSize = (Math.random() * 15 + 10) + "px";
        heart.style.opacity = Math.random() * 0.6 + 0.4;
        heart.style.animationDuration = (Math.random() * 2 + 2) + "s";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }, 300); // moins agressif = mobile OK
}

/* ========================= */
/* MAIN CONTENT */
/* ========================= */

function showMainContent() {
    localStorage.setItem("audioPlaying", "true");
    playMusic();

    const intro = document.getElementById("intro-container");
    const main = document.getElementById("main-content");

    if (!intro || !main) return;

    intro.style.transition = "opacity 1s ease";
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.classList.add("hidden");
        main.classList.remove("hidden");

        main.style.opacity = "0";

        setTimeout(() => {
            main.style.transition = "opacity 1s ease";
            main.style.opacity = "1";
        }, 100);
    }, 1000);
}

/* ========================= */
/* AUTO START */
/* ========================= */

document.addEventListener("DOMContentLoaded", () => {
    initMusic();

    if (localStorage.getItem("audioPlaying") === "true") {
        audio?.play().catch(() => showAudioSyncOverlay());
    }

    if (document.getElementById("intro-container")) {
        startIntro();
        startFallingHearts();
    }
});

/* ========================= */
/* CLICK UNLOCK AUDIO */
/* ========================= */

document.addEventListener("click", () => {
    if (
        audio &&
        localStorage.getItem("audioPlaying") === "true" &&
        audio.paused
    ) {
        audio.play().catch(() => {});
    }
});