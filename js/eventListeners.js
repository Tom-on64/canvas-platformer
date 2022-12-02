window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            if (player.velocity.y === 0)
                player.velocity.y = -player.jumpStrength;
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
