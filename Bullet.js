import * as BABYLON from '@babylonjs/core';

export class BulletBlueprint {
    constructor(shapeType = 'sphere', color = null, speed = 0.1, diameter = 0.2, lifespan = 1400) {
        this.shapeType = shapeType;
        this.color = color || new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        this.speed = speed;
        this.diameter = diameter;
        this.lifespan = lifespan;
    }

    loadShapeFromGLX(scene, filePath) {
        // Implement the logic to load a shape from a .glx file and assign it to this.shape
    }
}

export class Bullet {
    constructor(scene, initialPosition, direction, blueprint) {
        this.scene = scene;
        this.position = initialPosition;
        this.direction = direction;
        this.blueprint = blueprint;
        this.startTime = Date.now();

        this._init();
    }

    _init() {
        if (this.blueprint.shapeType === 'sphere') {
            this.mesh = BABYLON.MeshBuilder.CreateSphere("bullet", { diameter: this.blueprint.diameter }, this.scene);
        } else if (this.blueprint.shapeType === 'custom') {
            // Load custom shape from .glx file (if blueprint.shape is a path to a file)
            this.blueprint.loadShapeFromGLX(this.scene, this.blueprint.shape);
        }
        // Additional shape types can be added here

        this.mesh.position = this.position;

        let material = new BABYLON.StandardMaterial("bulletMaterial", this.scene);
        material.diffuseColor = this.blueprint.color;
        this.mesh.material = material;
    }

    update() {
        this.mesh.position.addInPlace(this.direction.scale(this.blueprint.speed));

        if ((Date.now() - this.startTime) >= this.blueprint.lifespan) {
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
