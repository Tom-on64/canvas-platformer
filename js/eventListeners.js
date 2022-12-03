window.addEventListener("keydown", (e) => {
    if (player.preventInput) return
  switch (e.key) {
    case "w":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
            player.velocity.x = 0
            player.velocity.y = 0
            player.preventInput = true;
            player.switchSprite("enterDoor")
            door.play()
          return;
        }
      }
      if (player.velocity.y === 0) player.velocity.y = -player.jumpStrength;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    default:
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    default:
      break;
  }
});
