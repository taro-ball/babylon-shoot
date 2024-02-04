//Bullet.js
import * as BABYLON from '@babylonjs/core';

export class BulletBlueprint {
    constructor( speed = 0.1, acceleration = 0.005, size = 0.2, lifespan = 1400, createShapeFunc) {
        this.speed = speed;
        this.acceleration = acceleration;
        this.size = size;
        this.lifespan = lifespan;
        this.createShapeFunc = createShapeFunc;
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

        this.mesh = this.blueprint.createShapeFunc(this.scene, this.blueprint);
        this.mesh.position = this.position;

        // init velocity
        let direction = this.target.position.subtract(this.position).normalize();
        this.velocity.addInPlace(direction.scale(this.blueprint.speed));
    }

    update() {


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
        // if the target is behind us, we must have hit it
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
        console.log("boom!");
        if (this.mesh) {
            //console.log("dispose");
            this.mesh.dispose();
            this.mesh = null;
        }
        this.toBeRemoved = true;


    }
}
