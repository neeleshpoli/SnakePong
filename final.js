"use strict";

screen.orientation.lock('landscape');
navigator.keyboard.lock(["Escape"]);
var paused = false;

function start() {
    enterFullscreen();
    document.getElementById("startMenu").style.visibility = "hidden";

    // Automatically pause game when user exits fullscreen
    document.addEventListener("fullscreenchange", function() {
        if (document.fullscreenElement === null) {
            pauseGame();
        }
    });

    document.addEventListener("keyup", function(event) {
        if (event.key === "Escape") {
            pauseGame();
        }
    });
}

function enterFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function pauseGame() {
    document.getElementById("pauseMenu").style.visibility = "visible";
    paused = true;
}

function continueGame() {
    document.getElementById("pauseMenu").style.visibility = "hidden";
    enterFullscreen()
    paused = false;
}