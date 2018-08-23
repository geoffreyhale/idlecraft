import Game from './game/components/Game';
import View from './view/index.jsx';

const game = new Game();
const view = new View();

function gameLoop(draw) {
    game.update();
    draw();
}

let gameLoopInterval = null;

function startLoop(draw) {
    if (!gameLoopInterval) {
        gameLoopInterval = window.setInterval(gameLoop.bind(null, draw), 100);
    }
}

function pauseLoop() {
    clearInterval(gameLoopInterval);
    gameLoopInterval = false;
}

function ResourceEl(domId, resource) {
    this.resource = resource;
    this.elQuantity = document.querySelector('#' + domId + ' > .quantity');
    this.elName = document.querySelector('#' + domId + ' > .name');
    this.prevName = null;
    this.draw = function() {
        this.elQuantity.innerHTML = this.resource.quantity;

        if (resource.name != this.prevName) {
            this.elName.innerHTML = this.resource.name.charAt(0).toUpperCase() + this.resource.name.slice(1);
        }
    };
}

window.onload = function(){
    view.render();

    const elTime = new ResourceEl('time', game.time);
    const elTrees = new ResourceEl('trees', game.trees);
    const elWood = new ResourceEl('wood', game.wood);
    const elFire = new ResourceEl('fire', game.fire);
    const elHeat = new ResourceEl('heat', game.heat);
    const elWater = new ResourceEl('water', game.water);
    const elSoup = new ResourceEl('soup', game.soup);

    function draw() {
        elTime.draw();
        elTrees.draw();
        elWood.draw();
        elFire.draw();
        elHeat.draw();
        elWater.draw();
        elSoup.draw();
    }

    const elStartButton = document.getElementById('start');
    elStartButton.addEventListener('click', startLoop.bind(null, draw));
    const elPauseButton = document.getElementById('pause');
    elPauseButton.addEventListener('click', pauseLoop);

    const elTakeTreesButton = document.querySelector('#trees button.take');
    elTakeTreesButton.addEventListener('click', game.chopTrees);

    const elMakeFireButton = document.querySelector('#fire button.make');
    elMakeFireButton.addEventListener('click', game.makeFire);

    const elMakeSoupButton = document.querySelector('#soup button.make');
    elMakeSoupButton.addEventListener('click', game.makeSoup);

    draw();
};