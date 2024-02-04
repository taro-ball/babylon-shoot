// GameLogic.js
//import * as GUI from '@babylonjs/gui';
import * as BABYLON from '@babylonjs/core';
import { Inspector } from '@babylonjs/inspector';

import GameGUI from './GameGUI.js';
import { Bullet } from './Bullet.js';
import { Spaceship } from './Spaceship.js';
import * as BulletBlueprints from './BulletBlueprints.js';

export default class GameLogic {
    constructor(canvas) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.bullets = []; // Store active bullets
        this.spaceship = new Spaceship(this.scene, "mySpaceship", new BABYLON.Vector3(0, 0, 0));
        this._init();
    }

    async _init() {
        //background
        this.scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.1, 1);

        // Create a camera and point it to the center of the scene
        const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.attachControl(this.canvas, true);

        // Create a light
        new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

        // add glow
        this.glowLayer = new BABYLON.GlowLayer("glow", this.scene);
        this.glowLayer.intensity = 1.5; // Adjust the glow intensity to your liking

        //Load GUI from GameLogic.js
        this.gameGUI = new GameGUI(this.scene); // Initialize your GUI here


        //const spaceship = new Spaceship(this.scene, "mySpaceship", new BABYLON.Vector3(0, 0, 0));

        // Handle mouse click
        this.canvas.addEventListener('click', (event) => {
            //console.log('Canvas clicked');
            this._shootBullet(event);
        });


        this._createPracticeTargets();

        // Run the render loop
        this.engine.runRenderLoop(() => {
            this.update();
            this.spaceship.update();
            this.bullets.forEach(bullet => bullet.update());
            //this.bullets = this.bullets.filter(bullet => bullet.mesh); // Remove disposed bullets
            this.scene.render();
        });

        Inspector.Show(this.scene, {});
    }

    _shootBullet(event) {
        // Use a ray from the camera to the click position to determine if a target is clicked
        const pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
        if (pickResult.hit && pickResult.pickedMesh) {
            const pickedTarget = pickResult.pickedMesh; // The target mesh that was clicked

            const bulletStartPosition = new BABYLON.Vector3(0, 0, 0); // Starting position of the bullet, adjust as needed

            // Create a bullet that aims at the picked target
            //const bullet = new Bullet(this.scene, bulletStartPosition, pickedTarget, BulletBlueprints.CubeBullet1);

            // Use the spaceship's shoot method
            const bullet = this.spaceship.shoot(pickedTarget);

            this.bullets.push(bullet);
            console.log("Bullet created", bullet);
        }
    }

    _createPracticeTargets() {
        const numberOfTargets = 5; // Change as per need
        for (let i = 0; i < numberOfTargets; i++) {
            const size = Math.random() * 0.5 + 0.5; // Random size between 0.5 and 1
            const box = BABYLON.MeshBuilder.CreateBox(`box${i}`, { size: size }, this.scene);
            box.position.x = Math.random() * 10 - 5; // Random position between -5 and 5
            box.position.y = Math.random() * 10 - 5; // Random position between -5 and 5
            box.position.z = Math.random() * 10 - 5; // Random position between -5 and 5

            const material = new BABYLON.StandardMaterial(`material${i}`, this.scene);
            material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random()); // Random color
            material.wireframe = true;
            box.material = material;
        }

    }

    update() {

        // Remove bullets marked for removal
        this.bullets = this.bullets.filter(bullet => !bullet.toBeRemoved);

    }

}
