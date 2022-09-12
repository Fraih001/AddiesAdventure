export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
    };
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        // score
        context.fillText('Score: ' + this.game.score, 20, 50)

        // timer
        context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);

        // lives
        for (let i = 0; i < this.game.lives; i++) {
        context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
        }

        // fire ammo
        context.fillStyle = 'rgb(255,165,0, 0.6)';
        for (let i = 0; i < this.game.fireAmmo; i++){
            context.fillRect(1 * i + 20,140,1,20);
        }

        // game over msg
        if (this.game.gameOver){
        if (this.game.score > this.game.winningScore){
            context.fillStyle ='rgba(255, 255, 255, .8)';
            context.fillRect(0, 0, this.game.width, this.game.height);
            context.fillStyle = this.game.fontColor;
            context.textAlign = 'center';
            context.font = `${this.fontSize * 2}px ${this.fontFamily}`;
            context.fillText('You did it!', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = `${this.fontSize * 0.7}px ${this.fontFamily}`;
            context.fillText('You Win This Round! Press R to play again.', this.game.width * 0.5, this.game.height * 0.5 + 20);
        } else {
            context.fillStyle = 'rgba(255, 255, 255, .8)';
            context.fillRect(0, 0, this.game.width, this.game.height);
            context.fillStyle = this.game.fontColor;
            context.textAlign = 'center';
            context.font = `${this.fontSize * 2}px ${this.fontFamily}`;
            context.fillText('What happened?', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = `${this.fontSize * 0.7}px ${this.fontFamily}`;
            context.fillText('You Lose. Press R to play again.', this.game.width * 0.5, this.game.height * 0.5 + 20);
       
        }
    }
    context.restore();
}
}