// Matching Game Logic
const characterImages = [
  'images/character-gadzooks.png',
  'images/character-chester.png',
  'images/character-jack.png',
  'images/character-jasper.png',
  'images/character-katie.png',
  'images/character-serena.png'
];

// Duplicate and shuffle for 16 cards (8 pairs)
let cards = [...characterImages, ...characterImages];
// If you want 16 unique, add 4 more images or repeat some
while (cards.length < 16) {
  cards.push(characterImages[Math.floor(Math.random() * characterImages.length)]);
}

cards = cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById('game-board');
let flippedCards = [];
let matchedCards = [];

function createCard(index, characterImg) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.index = index;
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="images/icon.png" alt="icon" />
      </div>
      <div class="card-back">
        <img src="${characterImg}" alt="character" />
      </div>
    </div>
  `;
  card.addEventListener('click', () => handleCardClick(card, index));
  return card;
}

function handleCardClick(card, index) {
  if (
    flippedCards.length === 2 ||
    flippedCards.includes(index) ||
    matchedCards.includes(index)
  ) return;

  card.classList.add('flipped');
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    const [firstIdx, secondIdx] = flippedCards;
    const firstImg = cards[firstIdx];
    const secondImg = cards[secondIdx];
    if (firstImg === secondImg) {
      matchedCards.push(firstIdx, secondIdx);
      flippedCards = [];
    } else {
      setTimeout(() => {
        document.querySelectorAll('.card')[firstIdx].classList.remove('flipped');
        document.querySelectorAll('.card')[secondIdx].classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}

function setupGame() {
  gameBoard.innerHTML = '';
  cards.forEach((img, idx) => {
    gameBoard.appendChild(createCard(idx, img));
  });
}

document.addEventListener('DOMContentLoaded', setupGame);
