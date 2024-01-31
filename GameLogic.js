// GameLogic.js
import * as BABYLON from '@babylonjs/core';
import Bullet from './Bullet.js';

export default class GameLogic {
    constructor(canvas) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.bullets = []; // Store active bullets
        this._init();
    }

    _init() {
        // Create a camera and point it to the center of the scene
        const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.attachControl(this.canvas, true);

        // Create a light
        new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

        // Handle mouse click
        this.canvas.addEventListener('click', (event) => {
            console.log('Canvas clicked');
            this._shootBullet(event);
        });



        //test obj

        this._createTargets();

        // Run the render loop
        this.engine.runRenderLoop(() => {
            this.bullets.forEach(bullet => bullet.update());
            this.bullets = this.bullets.filter(bullet => bullet.mesh); // Remove disposed bullets
            this.scene.render();
        });
    }

    _shootBullet(event) {
        // Use a ray from the camera to the click position to determine the direction
        const pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
        console.log("shhot started");
        if (pickResult.hit) {
            const targetPoint = pickResult.pickedPoint;
            const cameraPosition = new BABYLON.Vector3(0, 0, 0);
            const direction = targetPoint.subtract(cameraPosition);
            direction.normalize();

            console.log("shhot at:", direction);

            const bullet = new Bullet(this.scene, cameraPosition, direction);
            this.bullets.push(bullet);
            console.log("Bullet created", bullet);
        }
    }

    _createTargets() {
        const numberOfTargets = 5; // Change as per need
        for (let i = 0; i < numberOfTargets; i++) {
            const size = Math.random() * 0.5 + 0.5; // Random size between 0.5 and 1
            const box = BABYLON.MeshBuilder.CreateBox(`box${i}`, { size: size }, this.scene);
            box.position.x = Math.random() * 10 - 5; // Random position between -5 and 5
            box.position.y = Math.random() * 10 - 5; // Random position between -5 and 5
            box.position.z = Math.random() * 10 - 5; // Random position between -5 and 5

            const material = new BABYLON.StandardMaterial(`material${i}`, this.scene);
            material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random()); // Random color
            box.material = material;
        }
    }
}
