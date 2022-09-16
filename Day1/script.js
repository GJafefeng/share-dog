let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) {
  playerState = e.target.value;
});
// 创建和初始化2d的画布
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HRIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
// shadow_dog 图表的宽高 最多12行，宽度 6876/12=575  一共有10行 高度 5230/10=523
const spriteWidth = 575;
const spriteHeight = 523;
// 下面frameX,frameY两个变量用于控制精灵表的位置控制,X为控制哪一列的精灵图被选择，Y为控制哪一行的精灵图被控制
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
// 间隔帧，数字越大角色图片的切换越大看起来越卡顿
const staggerFrames = 6;
const spriteAnimations = [];
// 对应的精灵图的动作，他们的张数是不一样的
const animationStates = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 12
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'getHit',
    frames: 4
  }

];
// 创建对应动作X坐标和Y坐标的对象数组 以便后面的角色移动使用
animationStates.forEach((state, index) => {
  const frames = {
    loc: []
  };
  for (let j = 0; j < state.frames; j++) {
    const positionX = j * spriteWidth;
    const positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
// 通过打印可以看出每个对象数组的具体内容
console.log(spriteAnimations);

function animate () {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HRIGHT);
  // ctx.drawImage(img,sx, sy, sw, sh, dx,dy,dw,dh) sx, sy, sw, sh开始位置宽高 dx,dy,dw,dh终止位置宽高
  const position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  frameX = position * spriteWidth;
  frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
