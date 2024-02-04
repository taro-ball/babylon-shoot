import * as BABYLON from '@babylonjs/core';
import { BulletBlueprint } from './Bullet.js';

// FastBulletBlueprint declaration
export const CubeBullet1 = new BulletBlueprint(
    0.02,
    0.005,
    0.2,
    1400,
    (scene, blueprint) => {
        let mesh;
        mesh = BABYLON.MeshBuilder.CreateBox("bullet", { size: blueprint.size }, scene);

        let myColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        let material = new BABYLON.StandardMaterial("bulletMaterial", scene);
        material.diffuseColor = myColor;
        material.emissiveColor = myColor;
        mesh.material = material;
        return mesh;
    }
);

export const CubeBullet2 = new BulletBlueprint(
    0.04,
    0.00,
    0.1,
    3300,
    (scene, blueprint) => {
        let mesh;
        mesh = BABYLON.MeshBuilder.CreateBox("bullet", { size: blueprint.size }, scene);

        let myColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        let material = new BABYLON.StandardMaterial("bulletMaterial", scene);
        material.diffuseColor = myColor;
        material.emissiveColor = myColor;
        mesh.material = material;
        return mesh;
    }
);