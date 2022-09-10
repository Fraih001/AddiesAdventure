export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ( (e.key === 'ArrowDown' || 
                  e.key === 'ArrowUp' || 
                  e.key === 'ArrowLeft' || 
                  e.key === 'ArrowRight' ||
                  e.key === 'Shift') && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            } else if (e.key === 'd' || e.key === 'D') { this.game.debug = !this.game.debug;
            } else if (e.key ==='r' || e.key === 'R') this.game.reset = !this.game.reset;
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' || 
                e.key === 'ArrowLeft' || 
                e.key === 'ArrowRight' ||
                e.key === 'Shift'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        })
    }
}