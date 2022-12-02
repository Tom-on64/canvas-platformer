class Player extends Sprite {
  constructor({ collisionBlocks = [], src, frameRate, animations }) {
    super({
      position: {
        x: 200,
        y: 200,
      },
      src,
      frameRate,
      animations,
    });

    this.position = {
      x: 200,
      y: 200,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.gravity = 1;
    this.jumpStrength = 15;
    this.collisionBlocks = collisionBlocks;
  }

  horizontalCollisionCheck() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  verticalCollisionCheck() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  update() {
    this.position.x += this.velocity.x; // Apply Horizontal Velocity

    this.hitboxUpdate();

    this.horizontalCollisionCheck();
    this.applyGravity();

    this.hitboxUpdate();

    ctx.fillStyle = "#0000FF44";
    ctx.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );

    this.verticalCollisionCheck();
  }

  switchSprite(sprite) {
    if (this.image === this.animations[sprite].image) return;
    this.currentFrame = 0;
    this.image = this.animations[sprite].image;
    this.frameRate = this.animations[sprite].frameRate;
    this.frameBuffer = this.animations[sprite].frameBuffer;
  }

  hitboxUpdate() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
  }

  debug() {
    ctx.fillStyle = "#00FF0044";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
