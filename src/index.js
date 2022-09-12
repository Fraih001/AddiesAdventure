import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy} from './enemies.js';
import { UI } from './UI.js';

        // start menu + back to menu functionality

        function toggleGame(id, toggle){
            let element = document.getElementById(id);
            let display = toggle ? 'block' : 'none';
            element.style.display = display;
        };

        function toggleStartScreen(id, toggle){
            let element = document.getElementById(id);
            let display = toggle ? '' : 'none';
            element.style.display = display;
        };
    
        function toggleToGame(){
            document.getElementById('backtomenu').style.display = 'block';
            toggleGame('start-screen', false);
            toggleGame('canvas1', true)
        };

        function toggleToStartScreen(){
            document.getElementById('backtomenu').style.display = 'none';
            game.newGame = true;
            toggleStartScreen('start-screen', true)
            toggleStartScreen('canvas1', false);
        };

        // background music

        let audio = {
            mySound1: Object.assign(document.createElement('audio'), {
            src: './assets/pacman_background_music.ogg',
            loop: true,
            volume: 0.3,
            })};
        audio.mySound1.play();

        // create canvas boiler plate

        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = 900;
        canvas.height = 500;

        class Game {
            constructor(width, height){
                this.width = width;
                this.height = height;
                this.groundMargin = 40;
                this.speed = 0;
                this.maxSpeed = 3;
                this.background = new Background(this);
                this.player = new Player(this);
                this.input = new InputHandler(this);
                this.UI = new UI(this);
                this.fireAmmo = 100;
                this.maxFireAmmo = 200;
                this.fireAmmoTimer = 0;
                this.fireAmmoInterval = 20;
                this.particles = [];
                this.enemies = [];
                this.collisions = [];
                this.floatingMessages = [];
                this.maxParticles = 50;
                this.enemyTimer = 0;
                this.enemyInterval = 1000;
                this.debug = false;
                this.score = 0;
                this.winningScore = 30;
                this.fontColor = 'black';
                this.newGame = true;
                this.time = 0;
                this.maxTime = 30000;
                this.reset = false;
                this.gameOver = false;
                this.player.currentState = this.player.states[0];
                this.player.currentState.enter();
                this.lives = 5;
            }
            update(deltaTime){

                // handle timer
                this.time += deltaTime;
                if(this.time > this.maxTime) this.gameOver = true;

                // handle background
                this.background.update();

                // handle player
                this.player.update(this.input.keys, deltaTime);

                // handle enemies
                if (this.enemyTimer > this.enemyInterval){
                    this.addEnemy();
                    this.enemyTimer = 0;
                } else {
                    this.enemyTimer += deltaTime;
                }
                this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
                });

                // handle messages
                this.floatingMessages.forEach(message => {
                    message.update();
                });

                // handle particles
                this.particles.forEach((particle, index) => {
                    particle.update();
                });
                if(this.particles.length > this.maxParticles){
                    this.particles.length = this.maxParticles;
                };

                // handle collisions sprites
                this.collisions.forEach((collision, index)=>{
                    collision.update(deltaTime);
                });

                this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
                this.particles = this.particles.filter(particle => !particle.markedForDeletion);
                this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
                this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);

                //handle fire ammo
                if(this.fireAmmoTimer > this.fireAmmoInterval){
                    if(this.fireAmmo < this.maxFireAmmo) this.fireAmmo += 2;
                    this.fireAmmoTimer = 0;
                } else {
                    this.fireAmmoTimer += deltaTime;
                }
                
            }
            draw(context){
                this.background.draw(context);
                this.player.draw(context);
                this.enemies.forEach(enemy => {
                    enemy.draw(context);
                });
                this.particles.forEach(particle => {
                    particle.draw(context);
                });
                this.collisions.forEach(collision => {
                    collision.draw(context);
                });
                this.floatingMessages.forEach(message => {
                    message.draw(context);
                })
                this.UI.draw(context);
            }
            addEnemy(){
                if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
                else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
                this.enemies.push(new FlyingEnemy(this));
                if (this.gameOver) {
                    this.enemies = [];
                }
            }
            gameOver1(){
                if(this.gameOver){
                    this.particles = [];
                    this.enemies = [];
                    this.collisions = [];
                    this.floatingMessages = [];
                }
            }
            resetGame(){
                if(this.reset){
                    this.particles = [];
                    this.enemies = [];
                    this.collisions = [];
                    this.floatingMessages = [];
                    this.score = 0;
                    this.time = 0;
                    this.lives = 5;
                    this.fireAmmo = 200;
                    this.maxFireAmmo = 300;
                    this.fireAmmoTimer = 0;
                    this.fireAmmoInterval = 20;
                    this.gameOver = false;
                    this.reset = false;
                }
            }
            startGame(){
                if(canvas.style.display === 'block' && this.newGame) {
                    this.particles = [];
                    this.enemies = [];
                    this.collisions = [];
                    this.floatingMessages = [];
                    this.score = 0;
                    this.time = 0;
                    this.lives = 5;
                    this.fireAmmo = 200;
                    this.maxFireAmmo = 300;
                    this.fireAmmoTimer = 0;
                    this.fireAmmoInterval = 20;
                    this.gameOver = false;             
                    this.newGame = false;
                }
            }
        }

        const game = new Game(canvas.width, canvas.height);

        // main animation loop functionality + origin of deltaTime + context
        let lastTime = 0;
        
        function animate(timeStamp){
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            // ctx.clearRect(0, 0, canvas.width, canvas.height)
            game.update(deltaTime);
            game.draw(ctx);
            requestAnimationFrame(animate);
            game.startGame();
            game.gameOver1();
            game.resetGame();

        }
        animate(0);

        document.getElementById('startgame').addEventListener('click', toggleToGame);
        document.getElementById('backtomenu').addEventListener('click', toggleToStartScreen);