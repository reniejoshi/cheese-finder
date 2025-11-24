const container = document.getElementById('buttonPar');
const timerElement = document.getElementById('timer');
const tryCountElement = document.getElementById('tryCount');
const modal = document.getElementById("modal");
const modalP = document.getElementById("modal-p");
const closeBtn = document.querySelector(".close");
const restartBtn = document.getElementById("modal-btn");

const width = 10;
const height = 10;

let timer;
let cheeseX, cheeseY;
let tryCount = 0;
let initalTime = 20;
let time = initalTime;

function playGame(width, height) {
    timerElement.textContent = "Time: " + time;
    tryCountElement.textContent = "Try: " + tryCount;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let newButton = document.createElement("button");
            newButton.className = "upButton";
            newButton.setAttribute("x", x);
            newButton.setAttribute("y", y);
            newButton.textContent = "~";
            newButton.addEventListener("click", buttonClickedHandler)
            container.appendChild(newButton);
        }
        let lineBreak = document.createElement("br");
        container.appendChild(lineBreak);
    }

    cheeseX = getRandom(0, width);
    cheeseY = getRandom(0, height);

    timer = setInterval(tick, 1000);
}

function getRandom(min, max) {
    let range = max - min;
    let result = Math.floor(Math.random() * range) + min;
    return result;
}

function buttonClickedHandler(event) {
    let button = event.target;
    let x = button.getAttribute("x");
    let y = button.getAttribute("y");
    if (x == cheeseX && y == cheeseY) {
        button.className = "cheeseButton";
        stopGame();
        modalP.textContent = `Well done! You found the cheese in ${tryCount} tries and ${initalTime - time} seconds.`;
        displayModal();
    }
    else {
        let dx = x - cheeseX;
        let dy = y - cheeseY;
        let distance = Math.round(Math.sqrt((dx * dx) + (dy * dy)));
        button.textContent = distance;
        switch (distance) {
            case 1:
                button.className = "buttonOne";
                break;
            case 2:
                button.className = "buttonTwo";
                break;
            case 3:
                button.className = "buttonThree";
                break;
            case 4:
                button.className = "buttonFour";
                break;
            case 5:
                button.className = "buttonFive";
                break;
            case 6:
                button.className = "buttonSix";
                break;
            case 7:
                button.className = "buttonSeven";
                break;
            case 8:
                button.className = "buttonEight";
                break;
            case 9:
                button.className = "buttonNine";
                break;
        }
        tryCount++;
        tryCountElement.textContent = "Try: " + tryCount;
    }
}

function tick() {
    time -= 1;
    timerElement.textContent = "Time: " + time;
    if (time === 0) {
        stopGame();
        modalP.textContent = "Time up! Better luck next time";
        displayModal();
    }
}

function stopGame() {
    clearInterval(timer);
    const buttonsList = document.querySelectorAll("button");
    for (let i = 0; i < buttonsList.length; i++) {
        buttonsList[i].disabled = true;
    }
}

function displayModal() {
    restartBtn.disabled = false;
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function restart() {
    tryCount = 0;
    time = initalTime;
    container.innerHTML = '';
    closeModal();
    clearInterval(timer);
    playGame(width, height);
}

closeBtn.addEventListener('click', closeModal);
restartBtn.addEventListener('click', restart);