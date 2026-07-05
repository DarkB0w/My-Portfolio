const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 200;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = (Math.random() - 0.5) * width;
        this.y = (Math.random() - 0.5) * height;
        this.z = Math.random() * width;
        this.pz = this.z;
    }

    update() {
        this.z -= 2; // Speed of stars (warp effect)
        if (this.z < 1) {
            this.reset();
            this.z = width;
        }
    }

    draw() {
        // Map 3D coordinates to 2D screen
        const sx = (this.x / this.z) * width + width / 2;
        const sy = (this.y / this.z) * height + height / 2;

        const px = (this.x / this.pz) * width + width / 2;
        const py = (this.y / this.pz) * height + height / 2;

        this.pz = this.z;

        // Draw star as a line to create motion blur effect
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        
        // Dynamic opacity based on distance
        const opacity = 1 - (this.z / width);
        // Purple/Blue tinted stars
        const r = Math.floor(157 + Math.random() * 50);
        const g = Math.floor(78 + Math.random() * 100);
        const b = 221;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.lineWidth = (1 - this.z / width) * 2;
        ctx.stroke();
    }
}

for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function animate() {
    // Fill background with slight opacity for trailing effect
    ctx.fillStyle = 'rgba(5, 5, 8, 0.2)';
    ctx.fillRect(0, 0, width, height);

    ctx.translate(width / 2, height / 2);
    // Slight rotation based on mouse or time could be added here
    ctx.translate(-width / 2, -height / 2);

    for (let star of stars) {
        star.update();
        star.draw();
    }

    requestAnimationFrame(animate);
}

animate();
