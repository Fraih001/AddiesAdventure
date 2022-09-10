export class FloatingMessage {
    constructor(value, x, y, targetX, targetY){
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
        this.sound1 = new Audio();
        this.sound1.src = './assets/magical_5.ogg';
        this.sound1.volume = 0.15;
        this.sound2 = new Audio();
        this.sound2.src = './assets/hit01.wav';
        this.sound2.volume = .2;
    }
    update(){
        this.x += (this.targetX - this.x) * 0.03;
        this.y += (this.targetY - this.y) * 0.03;
        this.timer++
        if (this.timer > 100) this.markedForDeletion = true;
    }
    draw(context){
        if (this.value === '+1') {
            this.sound1.play();

        context.font = '20px Creepster';
        context.fillStyle = 'white';
        context.fillText(this.value, this.x, this.y);
        context.fillStyle = 'black';
        context.fillText(this.value, this.x + 2, this.y - 2);
        } else {
            this.sound2.play();
            context.font = '20px Creepster';
            context.fillStyle = 'black';
            context.fillText(this.value, this.x, this.y);
            context.fillStyle = 'red';
            context.fillText(this.value, this.x + 2, this.y - 2);
        }
    }
}