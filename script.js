const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const restartBtn = document.getElementById("restartBtn");

// Responsive Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let keys = {};
let moveLeft = false;
let moveRight = false;
let gameOver = false;
let score = 0;

// Keyboard
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// Mobile Buttons
leftBtn.addEventListener("touchstart", () => moveLeft = true);
leftBtn.addEventListener("touchend", () => moveLeft = false);

rightBtn.addEventListener("touchstart", () => moveRight = true);
rightBtn.addEventListener("touchend", () => moveRight = false);

// Desktop mouse
leftBtn.addEventListener("mousedown", () => moveLeft = true);
leftBtn.addEventListener("mouseup", () => moveLeft = false);

rightBtn.addEventListener("mousedown", () => moveRight = true);
rightBtn.addEventListener("mouseup", () => moveRight = false);

// Restart
restartBtn.addEventListener("click", () => {
    location.reload();
});

// ---------------- BALL ----------------

class Ball {
    constructor() {
        this.radius = 15;
        this.reset();
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = 50;
        this.vx = 2;
        this.vy = 0;
        this.gravity = 0.4;
    }

    update(paddle) {

        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        // Wall bounce
        if (this.x - this.radius < 0 || 
            this.x + this.radius > canvas.width) {
            this.vx *= -1;
        }

        if (this.y - this.radius < 0) {
            this.vy *= -1;
        }

        // Bottom = Game Over
        if (this.y + this.radius > canvas.height) {
            gameOver = true;
            restartBtn.style.display = "block";
        }

        // Paddle collision
        if (
            this.x > paddle.x &&
            this.x < paddle.x + paddle.width &&
            this.y + this.radius > paddle.y &&
            this.y - this.radius < paddle.y + paddle.height
        ) {
            let hit = this.x - (paddle.x + paddle.width / 2);
            let normalized = hit / (paddle.width / 2);

            this.vx = normalized * 5;
            this.vy = -Math.abs(this.vy) * 1.05;

            score++;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}

// ---------------- PADDLE ----------------

class Paddle {
    constructor() {
        this.width = 120;
        this.height = 20;
        this.speed = 7;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 60;
    }

    update() {

        if (keys["ArrowLeft"] || moveLeft)
            this.x -= this.speed;

        if (keys["ArrowRight"] || moveRight)
            this.x += this.speed;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width)
            this.x = canvas.width - this.width;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// ---------------- GAME LOOP ----------------

let ball = new Ball();
let paddle = new Paddle();

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = "yellow";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Gravity Bounce Challenge", canvas.width / 2, 40);

    if (!gameOver) {

        paddle.update();
        paddle.draw();

        ball.update(paddle);
        ball.draw();

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 80, 30);

        requestAnimationFrame(animate);

    } else {

        ctx.fillStyle = "red";
        ctx.font = "50px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

        ctx.font = "25px Arial";
        ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 40);
    }
}

animate();