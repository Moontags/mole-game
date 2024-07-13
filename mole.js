let currMoleTile; // Auttaa jäljittämään missä kolossa myyrä on 
let currPlantTile; // Piranhakasvi
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        // Asetetaan jokaiselle diville id
        let tile = document.createElement('div');
        tile.id = i.toString();
        tile.addEventListener('click', selectTile);
        document.getElementById('board').appendChild(tile); // Asetetaan 9 tagia board divin sisälle
    }

    setInterval(setMole, 2000); // Kutsuu myyrää 2 sekunnin välein
    setInterval(setPlant, 3000); // Kutuu piranhakasvia 3 sekunnin välein 
}

function getRandomTile() {
    // Palauttaa kokonaisluvun 0-9 ja muuttaa sen merkkijonoksi, jota voi käyttää id:ssä
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {

        if (gameOver) {
            return;
        }

        if (currMoleTile) {
            currMoleTile.innerHTML = ''; // Poistaa kaikki tagit divistä, joten myyrä on yhdessä piipussa kerrallaan 
        }

    let mole = document.createElement('img'); // Luodaan image tagi myyrälle
    mole.src = './monty-mole.png';

    let num = getRandomTile(); // Asettaa myyrän satunnaiselle putkelle
    if (currPlantTile && currPlantTile.id == num) { // Tarkistaa onko piranhakasvi putkessa
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole); // Asettaa image tagin satunnaisen putken sisälle
}

function setPlant() {

    if (gameOver) {
        return;
    }

    if (currPlantTile) {
        currPlantTile.innerHTML = '';
    }

    let plant = document.createElement('img');
    plant.src = './piranha-plant.png';
    //  Piranhakasvi näkyy satunnaisesti valitussa putkessa
    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) { // Tarkistaa onko myyrä putkessa
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

// appendChild-metodia käytetään lisäämään uusia elementtejä DOM-rakenteeseen, mikä mahdollistaa pelin dynaamisen päivittämisen ja elementtien näyttämisen eri kohdissa pelilautaa

function selectTile() {

    if (gameOver) {
        return;
    }

    if (this == currMoleTile) { // Tarkistää onko putki sama jossa myyrä on ja lisää 10 pistettä
        score += 10;
        document.getElementById('score').innerText = score.toString(); // Päivitää tuloksen
    }

    else if (this == currPlantTile) {
        document.getElementById('score').innerText = 'GAME OVER: ' + score.toString(); // Jos putkessa kavi peli loppuu ja tulos ilmoitetaan
        gameOver = true;
    }
}