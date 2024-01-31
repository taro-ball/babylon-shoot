// GameLogic.js
import * as BABYLON from '@babylonjs/core';
import Bullet from './Bullet.js';

export default class GameLogic {
    constructor(canvas) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = null;

        this._init();
    }

    _init() {
        this.scene = new BABYLON.Scene(this.engine);

        new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

        // Create the bullet
        new Bullet(this.scene);

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}
