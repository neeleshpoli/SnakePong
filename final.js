"use strict";

screen.orientation.lock('landscape');

// Changes default exit fullscreen mechanism 
navigator.keyboard.lock(["Escape"]);

var paused = false, canvas, ctx, windowHeight, windowWidth, mouseX, mouseY;

window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Get mouse position
    canvas.addEventListener("mousemove", function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
};

function start() {
    enterFullscreen();
    // Hides the start menu
    document.getElementById("startMenu").style.visibility = "hidden";

    // Hides the mosue cursor
    canvas.style.cursor = "none";

    // Makes the rendering canvas visible and gets it ready for rendering
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    canvas.style.visibility = "visible";

    // Automatically pause game when user exits fullscreen
    document.addEventListener("fullscreenchange", function() {
        if (document.fullscreenElement === null) {
            pauseGame();
        }
    });

    // Pause the game wehn the user presses escape
    document.addEventListener("keyup", function(event) {
        if (event.key === "Escape") {
            pauseGame();
        }
    });
    
    render();
}

function render() {
    if (!paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, windowWidth * 0.01, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    requestAnimationFrame(render);
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
    canvas.style.cursor = "auto";
}

function continueGame() {
    document.getElementById("pauseMenu").style.visibility = "hidden";
    enterFullscreen()
    paused = false;
    canvas.style.cursor = "none";
}