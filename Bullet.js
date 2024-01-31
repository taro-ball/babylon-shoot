// Bullet.js
import * as BABYLON from '@babylonjs/core';

export default class Bullet {
    constructor(scene, initialPosition, direction) {
        this.scene = scene;
        this.position = initialPosition;
        this.direction = direction;
        this.speed = 0.1; // Speed of the bullet
        this._init();
        this.startTime = Date.now();
    }

    _init() {
        this.mesh = BABYLON.MeshBuilder.CreateSphere("bullet", { diameter: 0.2 }, this.scene);
        this.mesh.position = this.position;

        let material = new BABYLON.StandardMaterial("bulletMaterial", this.scene);
        material.diffuseColor = new BABYLON.Color3(0, 0, 1); // Blue
        this.mesh.material = material;
    }

    update() {
        // Make the bullet fly upwards
        //this.mesh.position.y += 0.1;
        this.mesh.position.addInPlace(this.direction.scale(this.speed));

        // Check if 5 seconds have passed
        if ((Date.now() - this.startTime) >= 1500) {
            this.dispose();
        }
    }

    dispose() {
        if (this.mesh) {
            this.mesh.dispose();
            this.mesh = null;
        }
    }
}
