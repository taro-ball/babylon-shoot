import * as BABYLON from '@babylonjs/core';

export class BulletBlueprint {
    constructor(shapeType = 'sphere', color = null, speed = 0.1, diameter = 0.2, lifespan = 1400) {
        this.shapeType = shapeType;
        this.color = color;
        this.speed = speed;
        this.diameter = diameter;
        this.lifespan = lifespan;
    }

    loadShapeFromGLX(scene, filePath) {
        // Implement the logic to load a shape from a .glx file and assign it to this.shape
    }
}

export class Bullet {
    constructor(scene, initialPosition, target, blueprint) {
        this.scene = scene;
        this.position = initialPosition;
        this.target = target;
        this.blueprint = blueprint;
        this.startTime = Date.now();
        this.toBeRemoved = false;
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
        this.color = this.blueprint.color || new BABYLON.Color3(Math.random(), Math.random(), Math.random())
        let material = new BABYLON.StandardMaterial("bulletMaterial", this.scene);
        material.diffuseColor = this.color;
        material.emissiveColor = this.color;
        this.mesh.material = material;
    }

    update() {

        let direction = this.target.position.subtract(this.position).normalize();

        this.mesh.position.addInPlace(direction.scale(this.blueprint.speed));

        // Check for collisions
        this.checkCollision();


        if ((Date.now() - this.startTime) >= this.blueprint.lifespan) {
            this.toBeRemoved = true;
        }


    }

    checkCollision() {
        const distance = BABYLON.Vector3.Distance(this.mesh.position, this.target.position);
        const collisionThreshold = 0.2; // Adjust based on your target and bullet size

        if (distance < collisionThreshold) {
            this.hit(); // Dispose of the bullet
            // Optional: Do something with the target
            // e.g., this.target.dispose();
        }
    }

    hit() {
        this.toBeRemoved = true;
    }
}
