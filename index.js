const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let parsedCollisions;
let collisionBlocks;

let background;

let doors;

const player = new Player({
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
    enterDoor: {
      src: "./img/king/enterDoor.png",
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      onComplete: () => {
        console.log("Done");
        overlay.opacity = 0;
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;

            if (level === 4) level = 1
            levels[level].init();
            player.switchSprite("idleRight");
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLv1.parse2d();
      collisionBlocks = parsedCollisions.createObjectsFrom2d();

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      player.collisionBlocks = collisionBlocks;
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        src: "./img/backgroundLevel1.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 750,
            y: 272,
          },
          src: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 7,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLv2.parse2d();
      collisionBlocks = parsedCollisions.createObjectsFrom2d();

      if (player.currentAnimation.isActive)
        player.currentAnimation.isActive = false;

      player.position.x = 100;
      player.position.y = 140;

      player.collisionBlocks = collisionBlocks;
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        src: "./img/backgroundLevel2.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 772,
            y: 336,
          },
          src: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 7,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLv3.parse2d();
      collisionBlocks = parsedCollisions.createObjectsFrom2d();

      if (player.currentAnimation.isActive)
        player.currentAnimation.isActive = false;

      player.collisionBlocks = collisionBlocks;
      player.position.x = 750;
      player.position.y = 230;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        src: "./img/backgroundLevel3.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 177,
            y: 335,
          },
          src: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 7,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
};

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

const overlay = {
  opacity: 0,
};

const animate = () => {
  window.requestAnimationFrame(animate);

  background.draw();

  /* collisionBlocks.forEach((collisionBlock) => { //* [DEBUG]
    collisionBlock.debug(); //* Draws Collision Blocks
  }); */

  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);

  player.draw();
  //player.debug(); //* Draws Hitbox And Margin [DEBUG]
  player.update();

  ctx.save();
  ctx.globalAlpha = overlay.opacity;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
};

levels[level].init();
animate();