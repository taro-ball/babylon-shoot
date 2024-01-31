import * as BABYLON from '@babylonjs/core';

export class BulletBlueprint {
    constructor(shapeType = 'sphere', color = null, speed = 0.1, acceleration = 0.005, diameter = 0.2, lifespan = 1400) {
        this.shapeType = shapeType;
        this.color = color;
        this.speed = speed;
        this.diameter = diameter;
        this.lifespan = lifespan;
        this.acceleration = acceleration
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
        this.velocity = new BABYLON.Vector3(0, 0, 0);

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

        // init velocity
        let direction = this.target.position.subtract(this.position).normalize();
        this.velocity.addInPlace(direction.scale(this.blueprint.speed));

        this.mesh.position = this.position;
        this.color = this.blueprint.color || new BABYLON.Color3(Math.random(), Math.random(), Math.random())
        let material = new BABYLON.StandardMaterial("bulletMaterial", this.scene);
        material.diffuseColor = this.color;
        material.emissiveColor = this.color;
        this.mesh.material = material;
    }

    update() {


        // let direction = this.target.position.subtract(this.position).normalize();
        // this.mesh.position.addInPlace(direction.scale(this.blueprint.speed));

        let direction = this.target.position.subtract(this.position).normalize();

        // Update the bullet's velocity vector based on its speed and direction
        this.velocity.addInPlace(direction.scale(this.blueprint.acceleration));

        // Update the bullet's position by adding its velocity vector to its current position
        this.mesh.position.addInPlace(this.velocity);

        // Check for collisions
        this.checkCollision();


        if ((Date.now() - this.startTime) >= this.blueprint.lifespan) {
            this.explode();
        }


    }

    checkCollision() {

        let deltaPos = this.velocity.dot(this.mesh.position.subtract(this.target.position))
        //console.log(pos)
        if (deltaPos > 0) {
            this.explode(); // Dispose of the bullet
        }


        // const distance = BABYLON.Vector3.Distance(this.mesh.position, this.target.position);
        // const collisionThreshold = 0.2; // Adjust based on your target and bullet size

        // if (distance < collisionThreshold) {
        //     this.hit(); // Dispose of the bullet
        //     // Optional: Do something with the target
        //     // e.g., this.target.dispose();
        // }
    }

    explode() {
        //this.target.dispose();
        //this.dispose();
        console.log("boom!");
        if (this.mesh) {
            console.log("dispose");
            this.mesh.dispose();
            this.mesh = null;
        }
        this.toBeRemoved = true;


    }
}
