import CANNON from 'cannon';
import * as THREE from 'three';
import BaseController from './BaseController';
export default class BatterUpController extends BaseController{
    constructor(data){
        super(data);
        const material1 = new THREE.MeshLambertMaterial( {color: 0x0000ff, reflectivity: 0} );
        const material2 = new THREE.MeshLambertMaterial( {color: 0xff0000, reflectivity: 0} );
        this.bat = this.environment.createSphere({size: {r: 1}, position: { x: -4, y: 12, z: 0 }, mass: 2, material: material1 });
        this.ball = this.environment.createSphere({size: {r: .5}, position: { x: -4, y: 12, z: 16 }, mass: 1, material: material2 });
        // this.cylinder = this.environment.createCylinder({size: {r: 1, y: 2}, position: {x: -12, y: 4, z: 16}, mass: 1, material: material2});
    }
    async pitch(){
        this.ball.body.position.y = 5.5;
        const worldPoint = new CANNON.Vec3(this.ball.body.position.x,this.ball.body.position.y,this.ball.body.position.z);
        const force = new CANNON.Vec3(0,100, -2000);
        this.ball.body.applyForce(force,worldPoint);

        const swing = {n: Math.random() - .5};

        while(this.ball.body.position.z > 3){
            await new Promise((resolve) => setTimeout(resolve, 1));
        }
        console.log(swing.n);
        this.bat.body.position.y = 5.5;
        this.bat.body.position.x += swing.n;
        const worldPoint2 = new CANNON.Vec3(this.bat.body.position.x,this.bat.body.position.y,this.bat.body.position.z);
        const force2 = new CANNON.Vec3(0,100, 12000);
        this.bat.body.applyForce(force2,worldPoint2);
        // this.ball.body.applyForceFromVector
    }
}