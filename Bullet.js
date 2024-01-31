// Bullet.js
import * as BABYLON from '@babylonjs/core';

export default class Bullet {
    constructor(scene) {
        this.scene = scene;
        this._init();
        this.startTime = Date.now();
    }

    _init() {
        this.mesh = BABYLON.MeshBuilder.CreateSphere("bullet", { diameter: 0.2 }, this.scene);
        this.mesh.position = new BABYLON.Vector3(0, 0, 0);

        let material = new BABYLON.StandardMaterial("bulletMaterial", this.scene);
        material.diffuseColor = new BABYLON.Color3(0, 0, 1); // Blue
        this.mesh.material = material;
    }

    update() {
        // Make the bullet fly upwards
        this.mesh.position.y += 0.1;

        // Check if 5 seconds have passed
        if ((Date.now() - this.startTime) >= 1000) {
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
