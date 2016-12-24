var birdPrototype = {
    x: 150,
    draw: function(dt) {
        this.update(dt);
        this.ctx.save();
        var temp = this.speed;
        var speedAtMaxAngle = 0.5;
        if (temp > speedAtMaxAngle) {
            temp = speedAtMaxAngle;
        } else if (temp < -speedAtMaxAngle) {
            temp = -speedAtMaxAngle;
        }
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(60 / 180 * Math.PI * (temp / speedAtMaxAngle));
        this.ctx.drawImage(this.img,
            52 * this.frameIndex, 0, 52, 45, -26, -22.5, 52, 45
        );
        this.ctx.restore();
    },
    update: function(dt) {
        this.waitTime = this.waitTime + dt;
        if (this.waitTime >= 200) {
            this.waitTime = this.waitTime - 200;
            this.frameIndex = ++this.frameIndex % 3;
        }
        this.speed = this.speed + this.accelerate * dt;
        this.y = this.y + this.speed * dt;
    }
}

function Bird(ctx, img) {
    this.ctx = ctx;
    this.img = img;
    this.y = 200;
    this.speed = 0;
    this.accelerate = 0.0005;
    this.frameIndex = 0;
    this.waitTime = 0;
}
Bird.prototype = birdPrototype;