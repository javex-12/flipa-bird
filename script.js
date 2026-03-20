// Flipa Bird Game Logic

// Import Babylon.js
import * as BABYLON from 'babylonjs';

// Create the game engine and scene
const canvas = document.getElementById('renderCanvas'); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Variables for game objects
let bird;
let obstacles = [];
let score = 0;

// Function to create the bird
function createBird() {
    bird = BABYLON.MeshBuilder.CreateBox('bird', { size: 1 }, scene);
    bird.position.y = 5;
    bird.position.x = -6;
    bird.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    bird.applyGravity = true;
}

// Function to create obstacles
function createObstacle() {
    const obstacleHeight = Math.random() * 3 + 1;
    const upperObstacle = BABYLON.MeshBuilder.CreateBox('upperObstacle', { height: obstacleHeight, width: 1, depth: 1 }, scene);
    upperObstacle.position.x = 6;
    upperObstacle.position.y = obstacleHeight / 2 + 2;

    const lowerObstacle = BABYLON.MeshBuilder.CreateBox('lowerObstacle', { height: 6 - obstacleHeight, width: 1, depth: 1 }, scene);
    lowerObstacle.position.x = 6;
    lowerObstacle.position.y = -(6 - obstacleHeight) / 2 - 2;

    obstacles.push({ upper: upperObstacle, lower: lowerObstacle });
}

// Function to detect collision
function checkCollision() {
    obstacles.forEach(obstacle => {
        if (bird.intersectsMesh(obstacle.upper, false) || bird.intersectsMesh(obstacle.lower, false)) {
            console.log('Game Over!');
        }
    });
}

// Function to update the score
function updateScore() {
    score++;
    console.log('Score: ', score);
}

// Game loop
engine.runRenderLoop(() => {
    scene.render();
    checkCollision();
});

// Event listener for keyboard input
window.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        bird.applyImpulse(new BABYLON.Vector3(0, 1, 0), bird.getAbsolutePosition());
    }
});

// Create initial game objects
createBird();
setInterval(createObstacle, 2000); // New obstacle every 2 seconds
