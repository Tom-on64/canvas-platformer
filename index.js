const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

const parsedCollisions = collisionsLv1.parse2d();
const collisionBlocks = parsedCollisions.createObjectsFrom2d();

const bgLv1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  src: "./img/backgroundLevel1.png",
});

const player = new Player({
  collisionBlocks,
  src: "./img/king/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      src: "./img/king/idle.png",
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
    },
    idleLeft: {
      src: "./img/king/idleLeft.png",
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
    },
    runRight: {
      src: "./img/king/runRight.png",
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
    },
    runLeft: {
      src: "./img/king/runLeft.png",
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
    },
  },
});

const doors = [
    new Sprite({
        position: {
            x: 0, 
            y: 0, 
        }, 
        src: "./img/doorOpen.png", 
        frameRate: 5, 
        frameBuffer: 7, 
        loop: false, 
    })
]

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const animate = () => {
  window.requestAnimationFrame(animate);

  bgLv1.draw();

  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.debug(); //* Draws Collision Blocks
  });

  doors.forEach((door) => {
    door.draw(); 
  });

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.switchSprite("runRight")
    player.velocity.x = 4;
    player.lastDirection = "right"
  } else if (keys.a.pressed) {
    player.switchSprite("runLeft");
    player.velocity.x = -4;
    player.lastDirection = "left"
} else {
    if (player.lastDirection === "left") player.switchSprite("idleLeft");
    else player.switchSprite("idleRight");
}

  player.draw();
  player.debug(); //* Draws Hitbox And Margin
  player.update();
};

animate();
