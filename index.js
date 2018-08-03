function Resource() {
    this.quantity = 0;
}

const time = new Resource();
const trees = new Resource();
const wood = new Resource();
const fire = new Resource();
const heat = new Resource();

time.update = function() {
    time.quantity++;
};
trees.update = function() {
    if (time.quantity % 10 == 0) {
        trees.quantity += 1;
    }
};
fire.update = function() {
    if (fire.quantity >= 1 && time.quantity % 20 == 0) {
        fire.quantity -= 1;
        heat.quantity += 2;
    }
};
heat.update = function() {
    if (heat.quantity > 0 && time.quantity % 40 == 0) {
        heat.quantity -= 1;
    }
};

function update() {
    time.update();
    trees.update();
    fire.update();
    heat.update();
}

function chopTrees() {
    if (trees.quantity < 1) {
        return;
    }
    trees.quantity -= 1;
    wood.quantity += 3;
}

function makeFire() {
    if (wood.quantity < 1) {
        return;
    }
    wood.quantity -= 1;
    fire.quantity += 1;
}

function gameLoop(draw) {
    update();
    draw();
}

let gameLoopInterval;

function startLoop(draw) {
    gameLoopInterval = window.setInterval(gameLoop.bind(null, draw), 100);
}

function pauseLoop() {
    clearInterval(gameLoopInterval);
}

function ResourceEl(domId, resource) {
    this.resource = resource;
    this.elQuantity = document.querySelector('#' + domId + ' > .quantity');
    this.draw = function() {
        this.elQuantity.innerHTML = this.resource.quantity;
    };
}

window.onload = function(){
    const elTime = new ResourceEl('time', time);
    const elTrees = new ResourceEl('trees', trees);
    const elWood = new ResourceEl('wood', wood);
    const elFire = new ResourceEl('fire', fire);
    const elHeat = new ResourceEl('heat', heat);

    function draw() {
        elTime.draw();
        elTrees.draw();
        elWood.draw();
        elFire.draw();
        elHeat.draw();
    }

    const elStartButton = document.getElementById('start');
    elStartButton.addEventListener('click', startLoop.bind(null, draw));
    const elPauseButton = document.getElementById('pause');
    elPauseButton.addEventListener('click', pauseLoop);

    const elTakeTreesButton = document.querySelector('#trees button.take');
    elTakeTreesButton.addEventListener('click', chopTrees);

    const elMakeFireButton = document.querySelector('#fire button.make');
    elMakeFireButton.addEventListener('click', makeFire);

    draw();
};