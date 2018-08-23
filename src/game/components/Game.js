import Resource from './Resource';

export default class Game {
    constructor() {
        this.time = new Resource('time');
        this.trees = new Resource('trees');
        this.wood = new Resource('wood');
        this.fire = new Resource('fire');
        this.heat = new Resource('heat');
        this.water = new Resource('water');
        this.soup = new Resource('soup');
        this.update = this.update.bind(this);
        this.chopTrees = this.chopTrees.bind(this);
        this.makeFire = this.makeFire.bind(this);
        this.makeSoup = this.makeSoup.bind(this);
    }

    update() {
        this.time.quantity++;

        if (this.heat.quantity >= 356) {
            this.trees.quantity = 0;
        } else if (this.time.quantity % 10 == 0) {
            this.trees.quantity += 1;
        }

        if (this.fire.quantity >= 1 && this.time.quantity % 20 == 0) {
            this.fire.quantity -= 1;
            this.heat.quantity += Math.max(1, Math.floor(this.fire.quantity/10));
        }

        if (this.heat.quantity > 0 && this.time.quantity % 40 == 0) {
            this.heat.quantity -= 1;
        }

        if (this.heat.quantity > 0 && this.time.quantity % 20 == 0) {
            this.water.quantity += 1;
            this.water.name = 'water';
        } else if (this.heat.quantity <= 0) {
            this.water.quantity = 0;
            this.water.name = 'ice';
        }
    }

    chopTrees() {
        if (this.trees.quantity < 1) {
            return;
        }
        this.trees.quantity -= 1;
        this.wood.quantity += 3;
    }

    makeFire() {
        if (this.wood.quantity < 1) {
            return;
        }
        this.wood.quantity -= 1;
        this.fire.quantity += 1;
    }

    makeSoup() {
        if (this.heat.quantity >= 100 && this.water.quantity >= 3) {
            this.water.quantity -= 3;
            this.soup.quantity += 1;
        }
    }
}