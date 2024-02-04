import * as BABYLON from '@babylonjs/core';
import * as BulletBlueprints from './BulletBlueprints.js';
import { Bullet } from './Bullet.js';

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
        this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameter: 0.5,
            segments: 1
        }, this.scene);



        // Create a PBR material
        const pbrMaterial = new BABYLON.PBRMaterial("pbr", this.scene);
        this.mesh.material = pbrMaterial;

        // Make it metallic and shiny
        pbrMaterial.metallic = 1.0; // 0: non-metallic, 1: metallic
        pbrMaterial.roughness = 0.1; // 0: smooth, 1: rough

        // Improve the shininess by adjusting the microSurface
        pbrMaterial.microSurface = 0.9; // Control the sharpness of the reflections

        // Add a subtle color to the material to simulate realistic metal
        pbrMaterial.albedoColor = new BABYLON.Color3(0.01, 0.95, 0.01);
        pbrMaterial.emissiveColor = new BABYLON.Color3(0.3, 0, 0);

        // Add reflection to the material for additional shininess without a texture
        pbrMaterial.reflectivityColor = new BABYLON.Color3(0.95, 0.95, 0.95);
        pbrMaterial.reflectionColor = new BABYLON.Color3(0.95, 0.95, 0.95);
        pbrMaterial.wireframe = true;


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

    shoot(target) {
        const bulletStartPosition = this.mesh.position.clone(); // Start the bullet at the spaceship's position
        const bullet = new Bullet(this.scene, bulletStartPosition, target, BulletBlueprints.CubeBullet1);
        return bullet; // Return the bullet so it can be managed by the GameLogic
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