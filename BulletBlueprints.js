//BulletBlueprints.js
import * as BABYLON from '@babylonjs/core';
import { BulletBlueprint } from './Bullet.js';

// FastBulletBlueprint declaration
export const CubeBullet1 = new BulletBlueprint(
    0.02,
    0.001,
    0.2,
    2222,
    (scene, blueprint) => {
        let mesh;
        mesh = BABYLON.MeshBuilder.CreateBox("bullet", { size: blueprint.size }, scene);

        let myColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        let material = new BABYLON.StandardMaterial("bulletMaterial", scene);
        material.diffuseColor = myColor;
        material.emissiveColor = myColor;
        material.wireframe = true;
        mesh.material = material;

        // Animation
        let animation = new BABYLON.Animation("xRotation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        // Animation keys
        let keys = [];
        keys.push({
            frame: 0,
            value: 0
        });
        keys.push({
            frame: 15,
            value: 2 * Math.PI
        });

        // Link animation keys to the animation
        animation.setKeys(keys);

        // Attach the animation to the mesh
        mesh.animations.push(animation);

        // Begin animation
        scene.beginAnimation(mesh, 0, 15, true);

        //Play sound
        let shootingSound = new BABYLON.Sound("ShootingSound", "assets/pop.mp3", scene, null, {
            autoplay: true,  // automatically start playing
            spatialSound: true  // 3D sound to be played in space (optional)
        });
        shootingSound.setPosition(mesh.position);

        return mesh;
    }
);
