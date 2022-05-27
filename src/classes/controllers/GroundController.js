import * as THREE from 'three';
import BaseController from './BaseController';
export default class GroundController extends BaseController{
    constructor(data, texture){
        super(data);
        const groundTex = new THREE.TextureLoader().load(texture);
        const groundMat = new THREE.MeshBasicMaterial( { map: groundTex } );
        const ground = this.environment.createPlane({size: {x: 50, y: 50, z: 0}, rotation: { x: -90, y: 0, z: 0 }, mass: 0, material: groundMat, orientation: { x: 1, y: 0, z: 0 } });
        this.environment.physics.floors.push(ground.body);
    }
}