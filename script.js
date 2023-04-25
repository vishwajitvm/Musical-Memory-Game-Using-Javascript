const gameboard = document.getElementById('gameboard');
const startButton = document.getElementById('startButton');
const practiceButton = document.getElementById('practiceButton');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const pianoButton = document.getElementById('pianoButton');
const guitarButton = document.getElementById('guitarButton');
const trumpetButton = document.getElementById('trumpetButton');
const instrumentPicker = document.getElementById('instrumentPicker');

const colors = ['red', 'blue', 'green', 'yellow'];
const instruments = {
  piano: {
    red: new Audio('piano_c.mp3'),
    blue: new Audio('piano_e.mp3'),
    green: new Audio('piano_g.mp3'),
    yellow: new Audio('piano_c2.mp3')
  },
  guitar: {
    red: new Audio('guitar_c.mp3'),
    blue: new Audio('guitar_e.mp3'),
    green: new Audio('guitar_g.mp3'),
    yellow: new Audio('guitar_c2.mp3')
  },
  trumpet: {
    red: new Audio('trumpet_c.mp3'),
    blue: new Audio('trumpet_e.mp3'),
    green: new Audio('trumpet_g.mp3'),
    yellow: new Audio('trumpet_c2.mp3')
  }
};

let gameRunning = false;
let practiceMode = false;
let score = 0;
let timer = 30;
let intervalId;
let sequence = [];
let sequenceIndex = 0;

function startGame() {
  gameRunning = true;
  practiceMode = false;
  score = 0;
  timer = 30;
  updateScore();
  updateTimer();
  message.textContent = '';
  startButton.style.display = 'none';
  practiceButton.style.display = 'none';
  instrumentPicker.style.display = 'none';
  gameboard.addEventListener('click', handleButtonClick);
  intervalId = setInterval(function() {
    timer--;
    updateTimer();
    if (timer <= 0) {
      endGame();
    }
  }, 1000);
  generateMove();
}

function practice() {
  gameRunning = true;
  practiceMode = true;
  score = 0;
  timer = 0;
  updateScore();
  updateTimer();
  message.textContent = '';
  startButton.style.display = 'none';
  practiceButton.style.display = 'none';
  instrumentPicker.style.display = 'none';
  gameboard.addEventListener('click', handleButtonClick);
}

function endGame() {
  gameRunning = false;
  clearInterval(intervalId);
  gameboard.removeEventListener('click', handleButtonClick);
  message.textContent = `Game Over! Your score is ${score}.`;
  startButton.style.display = 'inline-block';
  practiceButton.style.display = 'inline-block';
  instrumentPicker.style.display = 'block';
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateTimer() {
  timerDisplay.textContent = timer;
}

function handleButtonClick(event) {
  if (!gameRunning) {
    return;
  }
  const button = event.target;
  const color = button.classList[0];
  const instrument = getInstrument();
  playSound(color, instrument);
  if (color === sequence[sequenceIndex]) {
    button.classList.add('bright');
    setTimeout(function() {
      button.classList.remove('bright');
    }, 300);
    sequenceIndex++;
    score++;
    updateScore();
    if (sequenceIndex >= sequence.length) {
      sequenceIndex = 0;
      setTimeout(generateMove, 1000);
    }
  } else {
    if (practiceMode) {
      button.classList.add('bright');
      setTimeout(function() {
        button.classList.remove('bright');
      }, 300);
    } else {
      endGame();
    }
  } 
}

function generateMove() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const instrument = getInstrument();
  playSound(color, instrument);
  sequence.push(color);
  sequenceIndex = 0;
  }
  
  function playSound(color, instrument) {
  instruments[instrument][color].currentTime = 0;
  instruments[instrument][color].play();
  }
  
  function getInstrument() {
  return instrumentPicker.value;
  }
  
  startButton.addEventListener('click', startGame);
  practiceButton.addEventListener('click', practice);
  pianoButton.addEventListener('click', function() {
  instrumentPicker.value = 'piano';
  });
  guitarButton.addEventListener('click', function() {
  instrumentPicker.value = 'guitar';
  });
  trumpetButton.addEventListener('click', function() {
  instrumentPicker.value = 'trumpet';
  });

  // generate wave animation
const background = document.getElementById('background');
const ctx = background.getContext('2d');

let wave = {
  y: 100,
  length: 0.01,
  amplitude: 150,
  frequency: 0.01
};

function drawWave() {
  ctx.clearRect(0, 0, background.width, background.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.moveTo(0, background.height);
  for (let i = 0; i < background.width; i++) {
    ctx.lineTo(i, wave.y + Math.sin(i * wave.length + wave.frequency) * wave.amplitude);
  }
  ctx.lineTo(background.width, background.height);
  ctx.closePath();
  ctx.fill();

  wave.frequency += 0.05;
  requestAnimationFrame(drawWave);
}

drawWave();
