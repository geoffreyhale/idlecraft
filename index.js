function Resource(name) {
    this.name = name;
    this.quantity = 0;
}

const time = new Resource('time');
const trees = new Resource('trees');
const wood = new Resource('wood');
const fire = new Resource('fire');
const heat = new Resource('heat');
const water = new Resource('water');
const soup = new Resource('soup');

time.update = function() {
    time.quantity++;
};
trees.update = function() {
    if (heat.quantity >= 356) {
        trees.quantity = 0;
    } else if (time.quantity % 10 == 0) {
        trees.quantity += 1;
    }
};
fire.update = function() {
    if (fire.quantity >= 1 && time.quantity % 20 == 0) {
        fire.quantity -= 1;
        heat.quantity += Math.max(1, Math.floor(fire.quantity/10));
    }
};
heat.update = function() {
    if (heat.quantity > 0 && time.quantity % 40 == 0) {
        heat.quantity -= 1;
    }
};
water.update = function() {
    if (heat.quantity > 0 && time.quantity % 20 == 0) {
        water.quantity += 1;
        water.name = 'water';
    } else if (heat.quantity <= 0) {
        water.quantity = 0;
        water.name = 'ice';
    }
};

function update() {
    time.update();
    trees.update();
    fire.update();
    heat.update();
    water.update();
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

function makeSoup() {
    if (heat.quantity >= 100 && water.quantity >= 3) {
        water.quantity -= 3;
        soup.quantity += 1;
    }
}

function gameLoop(draw) {
    update();
    draw();
}

let gameLoopInterval = false;

function startLoop(draw) {
    console.log(gameLoopInterval);
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
    const elTime = new ResourceEl('time', time);
    const elTrees = new ResourceEl('trees', trees);
    const elWood = new ResourceEl('wood', wood);
    const elFire = new ResourceEl('fire', fire);
    const elHeat = new ResourceEl('heat', heat);
    const elWater = new ResourceEl('water', water);
    const elSoup = new ResourceEl('soup', soup);

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
    elTakeTreesButton.addEventListener('click', chopTrees);

    const elMakeFireButton = document.querySelector('#fire button.make');
    elMakeFireButton.addEventListener('click', makeFire);

    const elMakeSoupButton = document.querySelector('#soup button.make');
    elMakeSoupButton.addEventListener('click', makeSoup);

    draw();
};