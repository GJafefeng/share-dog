/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');// 创建一个ctx的2D画布
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 10;
const enemiesArray = [];

// 图片定义
// const enemyImage = new Image();
// enemyImage.src = './03/enemy1.png';
// 利用gameFrame来控制精灵表的跳转速度
let gameFrame = 0;

class Enemy {
  constructor () {
    this.image = new Image();
    // this.image.src = './03/enemy1.png';敌人1
    // this.image.src = './03/enemy2.png';敌人2
    // 精灵表1单独的宽高
    // this.spriteWidth = 293;
    // this.spriteHeight = 155;
    // this.width = this.spriteWidth / 2.5;
    // this.height = this.spriteHeight / 2.5;
    // 精灵表2
    // this.spriteWidth = 266;
    // this.spriteHeight = 188;
    // this.image.src = './03/enemy2.png';
    // this.speed = Math.random() * 4 - 2;// 移动速度
    // this.width = this.spriteWidth / 2;
    // this.height = this.spriteHeight / 2;
    // this.x = Math.random() * (canvas.width - this.width);
    // this.y = Math.random() * (canvas.height - this.height);
    // this.frame = 0;
    // this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    // this.angle = 0;
    // this.angleSpeed = Math.random() * 0.2;
    // this.curve = Math.random() * 7;
    // 精灵表3
    // this.spriteWidth = 218;
    // this.spriteHeight = 177;
    // this.image.src = './03/enemy3.png';
    // this.speed = Math.random() * 4 - 2;// 移动速度
    // this.width = this.spriteWidth / 2;
    // this.height = this.spriteHeight / 2;
    // this.x = Math.random() * (canvas.width - this.width);
    // this.y = Math.random() * (canvas.height - this.height);
    // this.frame = 0;
    // this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    // this.angle = 0;
    // this.angleSpeed = Math.random() * 1.5;
    // this.curve = Math.random() * 200 + 50;
    // 精灵表4
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.image.src = './03/enemy4.png';
    this.speed = Math.random() * 4 - 2;// 移动速度
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.newX = Math.random() * (canvas.width - this.width);
    this.newY = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 3);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update () {
    // 1.
    // this.x += Math.random() * 5 - 2.5;
    // this.y += Math.random() * 5 - 2.5;
    // animate sprites
    // 只有当gameFrame等于两张的时候才能加速
    // if (gameFrame % this.flapSpeed === 0) {
    //   this.frame > 4 ? this.frame = 0 : this.frame++;
    // }
    // 2.弧线无线移动
    // this.x -= this.speed;
    // this.y += this.curve * Math.sin(this.angle);
    // 3.圆形？？正弦和余弦关系的运动，不是很懂
    // this.x = canvas.width / 2 * Math.cos(this.angle * Math.PI / 90) + canvas.width / 2 - this.width / 2;
    // this.y = canvas.width / 2 * Math.sin(this.angle * Math.PI / 450) + canvas.width / 2 - this.width / 2;
    // this.angle += this.angleSpeed;
    // 4.随机位置移动
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    // 计算出新的位置
    const dx = this.x - this.newX;
    const dy = this.y - this.newY;
    this.x -= dx / 70;
    this.y -= dy / 70;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++;
    }
  }

  draw () {
    // 可以自由替代fillRect中得图像形状颜色等等
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
    // image, 剪辑（4位），位置（4位）
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

for (let i = 0; i <= numberOfEnemies; i++) {
// 用push,enemiesArray数组
  enemiesArray.push(new Enemy());
}

function animate () {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
