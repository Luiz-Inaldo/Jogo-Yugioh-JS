const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points')
    },

    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type')
    },

    fieldCards: {
        player: document.getElementById('player-card-field'),
        computer: document.getElementById('computer-card-field'),
    },

    actions: {
        button: document.getElementById('next-duel')
    }
}; 

// const pathImages = './scr/assets/icons/';

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards"
}

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `./src/assets/icons/dragon.png`,
        winOf: [1],
        loseOf: [2]
    },

    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `./src/assets/icons/magician.png`,
        winOf: [2],
        loseOf: [0]
    },

    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `./src/assets/icons/exodia.png`,
        winOf: [0],
        loseOf: [1]
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide){
    const cardImage = document.createElement('img');
    cardImage.setAttribute('height', '100px');
    cardImage.setAttribute('src', './src/assets/icons/card-back.png');
    cardImage.setAttribute('data-id', IdCard);
    cardImage.classList.add('card');


    if(fieldSide === playerSides.player1){
        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'));
        })

        cardImage.addEventListener('mouseover', () => {
            drawSelectedCard(IdCard);
        });
    }    

    return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function setCardsField(cardId){
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = 'block';
    state.fieldCards.computer.style.display = 'block';

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    // await updateScore();
    // await drawButton();

}

async function removeAllCardsImages(){
    let cards = document.querySelector('#computer-cards');
    let imageCard = cards.querySelectorAll('img');
    imageCard.forEach((img) => img.remove());

    cards = document.querySelector('#player-cards');
    imageCard = cards.querySelectorAll('img');
    imageCard.forEach((img) => img.remove());
}

async function drawSelectedCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = 'Attribute: ' + cardData[index].type;
}



function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();
