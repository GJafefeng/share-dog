// 初始化画布
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');// 创建一个ctx的2D画布
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 5;

window.addEventListener('load', function(){
// 创建背景图
const backgroundLayer1 = new Image();
backgroundLayer1.src = './02/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './02/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './02/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './02/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './02/layer-5.png';

const slider = document.querySelector('#slider');
slider.value = gameSpeed;
const showGameSpeed = document.querySelector('#showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function (e) {
  // e.target指向slider这个
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = gameSpeed;
});
// 创建一个类
class Layer {
  // 创建一个构造函数
  constructor (image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  // 函数方法
  update () {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = Math.floor(this.x - this.speed);
  }x

  draw () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
     ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

// 用一个数组存储layer们，用foreach语句进行遍历
const gameObject = [layer1, layer2, layer3, layer4, layer5];

// 设置动画
function animate () {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameObject.forEach(object => {
    object.update();
    object.draw();
  });
  requestAnimationFrame(animate);
}
animate();

})
