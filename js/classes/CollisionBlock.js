class CollisionBlock {
  constructor({ position }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
  }

  debug() {
    ctx.fillStyle = "#FF000044";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
