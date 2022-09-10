/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UI": () => (/* binding */ UI)
/* harmony export */ });
class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Creepster';
    this.livesImage = document.getElementById('lives');
  }

  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'white';
    context.shadowBlur = 0;
    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor; // score

    context.fillText('Score: ' + this.game.score, 20, 50); // timer

    context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
    context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80); // lives

    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
    } // game over msg


    if (this.game.gameOver) {
      if (this.game.score > this.game.winningScore) {
        context.fillStyle = 'rgba(255, 255, 255, .8)';
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

/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Background": () => (/* binding */ Background),
/* harmony export */   "Layer": () => (/* binding */ Layer)
/* harmony export */ });
class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update() {
    if (this.x < -this.width) this.x = 0;else this.x -= this.game.speed * this.speedModifier;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }

}
;
class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer5image = layer5;
    this.layer4image = layer4;
    this.layer3image = layer3;
    this.layer2image = layer2;
    this.layer1image = layer1;
    this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);
    this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image);
    this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image);
    this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image);
    this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image);
    this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
  }

  update() {
    this.backgroundLayers.forEach(layer => {
      layer.update();
    });
  }

  draw(context) {
    this.backgroundLayers.forEach(layer => {
      layer.draw(context);
    });
  }

}

/***/ }),

/***/ "./src/collisionAnimation.js":
/*!***********************************!*\
  !*** ./src/collisionAnimation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollisionAnimation": () => (/* binding */ CollisionAnimation)
/* harmony export */ });
class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById('boom');
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + 0.5;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frameX = 0;
    this.maxFrame = 4;
    this.markedForDeletion = false;
    this.fps = Math.random() * 10 + 5;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  draw(context) {
    context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }

  update(deltaTime) {
    this.x -= this.game.speed;

    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }

}

/***/ }),

/***/ "./src/enemies.js":
/*!************************!*\
  !*** ./src/enemies.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClimbingEnemy": () => (/* binding */ ClimbingEnemy),
/* harmony export */   "FlyingEnemy": () => (/* binding */ FlyingEnemy),
/* harmony export */   "GroundEnemy": () => (/* binding */ GroundEnemy)
/* harmony export */ });
class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    //movement 
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    } // check if enemy off screen


    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw(context) {
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }

}

class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = enemy_fly;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }

}
class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = enemy_plant;
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
  }

}
class ClimbingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.image = enemy_spider_big;
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
    if (this.y < -this.height) this.markedForDeletion = true;
  }

  draw(context) {
    super.draw(context);
    context.beginPath();
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + 50);
    context.stroke();
  }

}

/***/ }),

/***/ "./src/floatingMessages.js":
/*!*********************************!*\
  !*** ./src/floatingMessages.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FloatingMessage": () => (/* binding */ FloatingMessage)
/* harmony export */ });
class FloatingMessage {
  constructor(value, x, y, targetX, targetY) {
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

  update() {
    this.x += (this.targetX - this.x) * 0.03;
    this.y += (this.targetY - this.y) * 0.03;
    this.timer++;
    if (this.timer > 100) this.markedForDeletion = true;
  }

  draw(context) {
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

/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputHandler": () => (/* binding */ InputHandler)
/* harmony export */ });
class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener('keydown', e => {
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Shift') && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      } else if (e.key === 'd' || e.key === 'D') {
        this.game.debug = !this.game.debug;
      } else if (e.key === 'r' || e.key === 'R') this.game.reset = !this.game.reset;
    });
    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Shift') {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }

}

/***/ }),

/***/ "./src/particles.js":
/*!**************************!*\
  !*** ./src/particles.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dust": () => (/* binding */ Dust),
/* harmony export */   "Fire": () => (/* binding */ Fire),
/* harmony export */   "Splash": () => (/* binding */ Splash)
/* harmony export */ });
class Particle {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
  }

  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
  }

}

class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = 'rgba(0,0,0,0.2)';
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }

}
class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 2;
    this.gravity = 0;
    this.image = document.getElementById('fire');
  }

  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }

}
class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    this.image = fire;
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }

  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 10);
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
    context.restore();
  }

}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _playerStates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerStates.js */ "./src/playerStates.js");
/* harmony import */ var _collisionAnimation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collisionAnimation.js */ "./src/collisionAnimation.js");
/* harmony import */ var _floatingMessages_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./floatingMessages.js */ "./src/floatingMessages.js");



class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById('player');
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 4;
    this.states = [new _playerStates_js__WEBPACK_IMPORTED_MODULE_0__.Sitting(this.game), new _playerStates_js__WEBPACK_IMPORTED_MODULE_0__.Running(this.game), new _playerStates_js__WEBPACK_IMPORTED_MODULE_0__.Jumping(this.game), new _playerStates_js__WEBPACK_IMPORTED_MODULE_0__.Falling(this.game), new _playerStates_js__WEBPACK_IMPORTED_MODULE_0__.Rolling(this.game), new _playerStates_js__WEBPACK_IMPORTED_MODULE_0__.Diving(this.game), new _playerStates_js__WEBPACK_IMPORTED_MODULE_0__.Hit(this.game)];
    this.currentState = null;
  }

  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input); //horizontal movement

    this.x += this.speed;
    if (input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width; //vertical movement

    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;else this.vy = 0;
    if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin; // sprite animation

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context) {
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);

    if (this.game.reset) {
      this.x = 0;
      this.y = this.game.height - this.height - this.game.groundMargin;
      context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  checkCollision() {
    this.game.enemies.forEach(enemy => {
      if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
        enemy.markedForDeletion = true;
        this.game.collisions.push(new _collisionAnimation_js__WEBPACK_IMPORTED_MODULE_1__.CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));

        if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
          this.game.score++;
          this.game.floatingMessages.push(new _floatingMessages_js__WEBPACK_IMPORTED_MODULE_2__.FloatingMessage('+1', enemy.x, enemy.y, 150, 50));
        } else {
          this.setState(6, 0);
          this.game.floatingMessages.push(new _floatingMessages_js__WEBPACK_IMPORTED_MODULE_2__.FloatingMessage('-2', enemy.x, enemy.y, 150, 50));
          this.game.score -= 2;
          this.game.lives--;
          if (this.game.lives <= 0) this.game.gameOver = true;
        }
      }
    });
  }

}

/***/ }),

/***/ "./src/playerStates.js":
/*!*****************************!*\
  !*** ./src/playerStates.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Diving": () => (/* binding */ Diving),
/* harmony export */   "Falling": () => (/* binding */ Falling),
/* harmony export */   "Hit": () => (/* binding */ Hit),
/* harmony export */   "Jumping": () => (/* binding */ Jumping),
/* harmony export */   "Rolling": () => (/* binding */ Rolling),
/* harmony export */   "Running": () => (/* binding */ Running),
/* harmony export */   "Sitting": () => (/* binding */ Sitting)
/* harmony export */ });
/* harmony import */ var _particles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particles.js */ "./src/particles.js");

const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }

}

class Sitting extends State {
  constructor(game) {
    super('SITTING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 4;
  }

  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes('Shift')) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }

}
;
class Running extends State {
  constructor(game) {
    super('RUNNING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 8;
  }

  handleInput(input) {
    this.game.particles.unshift(new _particles_js__WEBPACK_IMPORTED_MODULE_0__.Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));

    if (input.includes('ArrowDown')) {
      this.game.player.setState(states.SITTING, 0);
    } else if (input.includes('ArrowUp')) {
      this.game.player.setState(states.JUMPING, 1);
    } else if (input.includes('Shift')) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }

}
class Jumping extends State {
  constructor(game) {
    super('JUMPING', game);
  }

  enter() {
    if (this.game.player.onGround()) this.game.player.vy -= 25;
    this.game.player.frameY = 1;
    this.game.player.maxFrame = 6;
    this.game.player.frameX = 0;
  }

  handleInput(input) {
    if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(states.FALLING, 1);
    } else if (input.includes('Shift')) {
      this.game.player.setState(states.ROLLING, 2);
    } else if (input.includes('ArrowDown')) {
      this.game.player.setState(states.DIVING, 0);
    }
  }

}
class Falling extends State {
  constructor(game) {
    super('FALLING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 2;
    this.game.player.maxFrame = 6;
  }

  handleInput(input) {
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes('ArrowDown')) {
      this.game.player.setState(states.DIVING, 0);
    }
  }

}
class Rolling extends State {
  constructor(game) {
    super('ROLLING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
  }

  handleInput(input) {
    this.game.particles.unshift(new _particles_js__WEBPACK_IMPORTED_MODULE_0__.Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

    if (!input.includes('Shift') && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (!input.includes('Shift') && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1);
    } else if (input.includes('Shift') && input.includes('ArrowUp') && this.game.player.onGround()) {
      this.game.player.vy -= 27;
    } else if (input.includes('ArrowDown') && !this.game.player.onGround()) {
      this.game.player.setState(states.DIVING, 0);
    }
  }

}
class Diving extends State {
  constructor(game) {
    super('DIVING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
    this.game.player.vy = 15;
  }

  handleInput(input) {
    this.game.particles.unshift(new _particles_js__WEBPACK_IMPORTED_MODULE_0__.Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);

      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(new _particles_js__WEBPACK_IMPORTED_MODULE_0__.Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));
      }
    } else if (input.includes('Shift') && !this.game.player.onGround()) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }

}
class Hit extends State {
  constructor(game) {
    super('HIT', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 4;
    this.game.player.maxFrame = 10;
  }

  handleInput(input) {
    if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1);
    }
  }

}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.js */ "./src/input.js");
/* harmony import */ var _background_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background.js */ "./src/background.js");
/* harmony import */ var _enemies_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemies.js */ "./src/enemies.js");
/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI.js */ "./src/UI.js");






function toggleGame(id, toggle) {
  let element = document.getElementById(id);
  let display = toggle ? 'block' : 'none';
  element.style.display = display;
}

;

function toggleStartScreen(id, toggle) {
  let element = document.getElementById(id);
  let display = toggle ? '' : 'none';
  element.style.display = display;
}

;

function toggleToGame() {
  document.getElementById('backtomenu').style.display = 'block';
  toggleGame('start-screen', false);
  toggleGame('canvas1', true);
}

;

function toggleToStartScreen() {
  document.getElementById('backtomenu').style.display = 'none';
  game.newGame = true;
  toggleStartScreen('start-screen', true);
  toggleStartScreen('canvas1', false);
}

;
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 500;
let audio = {
  mySound1: Object.assign(document.createElement('audio'), {
    src: './assets/pacman_background_music.ogg',
    loop: true,
    volume: 0.3
  })
};
audio.mySound1.play();

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 40;
    this.speed = 0;
    this.maxSpeed = 3;
    this.background = new _background_js__WEBPACK_IMPORTED_MODULE_2__.Background(this);
    this.player = new _player_js__WEBPACK_IMPORTED_MODULE_0__.Player(this);
    this.input = new _input_js__WEBPACK_IMPORTED_MODULE_1__.InputHandler(this);
    this.UI = new _UI_js__WEBPACK_IMPORTED_MODULE_4__.UI(this);
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

  update(deltaTime) {
    this.time += deltaTime;
    if (this.time > this.maxTime) this.gameOver = true;
    this.background.update();
    this.player.update(this.input.keys, deltaTime); // handle enemies

    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }

    this.enemies.forEach(enemy => {
      enemy.update(deltaTime);
    }); // handle messages

    this.floatingMessages.forEach(message => {
      message.update();
    }); // handle particles

    this.particles.forEach((particle, index) => {
      particle.update();
    });

    if (this.particles.length > this.maxParticles) {
      this.particles.length = this.maxParticles;
    }

    ; // handle collisions sprites

    this.collisions.forEach((collision, index) => {
      collision.update(deltaTime);
    });
    this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    this.particles = this.particles.filter(particle => !particle.markedForDeletion);
    this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
    this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
  }

  draw(context) {
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
    });
    this.UI.draw(context);
  }

  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new _enemies_js__WEBPACK_IMPORTED_MODULE_3__.GroundEnemy(this));else if (this.speed > 0) this.enemies.push(new _enemies_js__WEBPACK_IMPORTED_MODULE_3__.ClimbingEnemy(this));
    this.enemies.push(new _enemies_js__WEBPACK_IMPORTED_MODULE_3__.FlyingEnemy(this));

    if (this.gameOver) {
      this.enemies = [];
    }
  }

  gameOver1() {
    if (this.gameOver) {
      this.particles = [];
      this.enemies = [];
      this.collisions = [];
      this.floatingMessages = [];
    }
  }

  resetGame() {
    if (this.reset) {
      this.particles = [];
      this.enemies = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.score = 0;
      this.time = 0;
      this.lives = 5;
      this.gameOver = false;
      this.reset = false;
    }
  }

  startGame() {
    if (canvas.style.display === 'block' && this.newGame) {
      this.particles = [];
      this.enemies = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.score = 0;
      this.time = 0;
      this.lives = 5;
      this.gameOver = false;
      this.newGame = false;
    }
  }

}

const game = new Game(canvas.width, canvas.height);
let lastTime = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
})();

/******/ })()
;
//# sourceMappingURL=main.js.map