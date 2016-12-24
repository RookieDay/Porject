function renderView(ctx, model, dt) {
    ctx.clearRect(0, 0, 800, 600);
    for (var i = 0; i < model.displayObjects.length; i++) {
        model.displayObjects[i].draw(dt);
    }
}