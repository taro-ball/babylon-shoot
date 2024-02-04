import * as BABYLON from '@babylonjs/core';

export class Spaceship {
    constructor(scene, name, position) {
        this.scene = scene;
        this.name = name;
        this.position = position || new BABYLON.Vector3(0, 0, 0);
        this.velocity = new BABYLON.Vector3(0, 0, 0);
        this.acceleration = new BABYLON.Vector3(0, 0, 0);
        this.maxSpeed = 0.1;
        this.inertia = 0.91;
        this.mesh = null;

        this._init();
        this._setupKeyboardInput();
    }

    _init() {
        this.mesh = BABYLON.MeshBuilder.CreateBox(this.name, { size: 1 }, this.scene);
        this.mesh.position = this.position;
    }

    _setupKeyboardInput() {
        const inputMap = {};
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);

        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === "keydown";
        }));

        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === "keydown";
        }));

        this.scene.onBeforeRenderObservable.add(() => {
            this.acceleration = new BABYLON.Vector3(0, 0, 0); // Reset acceleration each frame

            // Adjust acceleration based on input
            if (inputMap["w"] || inputMap["W"]) {
                this.acceleration.y += 1;
            }
            if (inputMap["s"] || inputMap["S"]) {
                this.acceleration.y -= 1;
            }
            if (inputMap["a"] || inputMap["A"]) {
                this.acceleration.x += 1;
            }
            if (inputMap["d"] || inputMap["D"]) {
                this.acceleration.x -= 1;
            }
        });
    }

    update() {
        // Apply acceleration to velocity
        this.velocity.addInPlace(this.acceleration);
        
        // Clamp velocity to max speed
        if (this.velocity.length() > this.maxSpeed) {
            this.velocity.normalize().scaleInPlace(this.maxSpeed);
        }

        // Apply velocity to position
        this.mesh.position.addInPlace(this.velocity);

        // Apply inertia to slow down the spaceship
        this.velocity.scaleInPlace(this.inertia);
        
        // Reset acceleration (optional, if you want acceleration to be applied continuously, remove this line)
        this.acceleration = new BABYLON.Vector3(0, 0, 0);
    }
}