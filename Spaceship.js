import * as BABYLON from '@babylonjs/core';

export class Spaceship {
    constructor(scene, name, position) {
        this.scene = scene;
        this.name = name;
        this.position = position || new BABYLON.Vector3.Zero();
        this.speed = 1;
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
            if (inputMap["w"] || inputMap["W"]) {
                this.moveForward();
            }
            if (inputMap["s"] || inputMap["S"]) {
                this.moveBackward();
            }
            if (inputMap["a"] || inputMap["A"]) {
                this.moveLeft();
            }
            if (inputMap["d"] || inputMap["D"]) {
                this.moveRight();
            }
        });
    }

    moveForward() {
        this.mesh.position.y -= this.speed;
    }

    moveBackward() {
        this.mesh.position.y += this.speed;
    }

    moveLeft() {
        this.mesh.position.x -= this.speed;
    }

    moveRight() {
        this.mesh.position.x += this.speed;
    }

    update() {
        // Implement any continuous behavior or controls here
    }
}
