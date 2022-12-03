# Canvas Platformer
---
### Play It [HERE](https://tom-on64.github.io/canvas-platformer)

Made With [THIS](https://www.youtube.com/watch?v=Lcdc2v-9PjA&t=25s) Tutorial

### How To Disable Debug Features?
Just open the console and run:
```js
collisionBlocks.forEach(key => {
    key.debug = () => {}
})
player.update = function () {
    this.position.x += this.velocity.x; // Apply Horizontal Velocity

    this.hitboxUpdate();

    this.horizontalCollisionCheck();
    this.applyGravity();

    this.hitboxUpdate();

    this.verticalCollisionCheck();
}
player.debug = () => {}
```
