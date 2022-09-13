import { basicColorMaterial } from '../../utils/THREEHelpers';
import BaseController from '../controllers/BaseController';
import CANNON from 'cannon';

export default class CarController extends BaseController{
    constructor(data){
        super(data);

        this.vehicleWidth = 1;
        this.vehicleLength = 2;

        this.speed = 0;
        this.turnSpeed = 0;

        this.redMat = basicColorMaterial('ff0000');

        this.chassis = this.environment.createBox({size: {x: this.vehicleWidth, y: 1, z: this.vehicleLength}, position: {x: 0, y: 2, z: 0}, material: this.redMat, mass: 1});

        this.wheels = [
            {id: 'lf', pivot: new CANNON.Vec3(-this.vehicleWidth, -0.5, -this.vehicleLength / 2), axis: new CANNON.Vec3(1, 0, 0)},
            {id: 'rf', pivot: new CANNON.Vec3(this.vehicleWidth, -0.5, -this.vehicleLength / 2), axis: new CANNON.Vec3(1, 0, 0)},
            {id: 'lb', pivot: new CANNON.Vec3(-this.vehicleWidth, -0.5, this.vehicleLength / 2), axis: new CANNON.Vec3(1, 0, 0), motorized: true},
            {id: 'rb', pivot: new CANNON.Vec3(this.vehicleWidth, -0.5, this.vehicleLength / 2), axis: new CANNON.Vec3(1, 0, 0), motorized: true}
        ].map(item => {
            const wheel = this.environment.createSphere({ size: {r: .4}, position: {x: item.pivot.x, y: 1, z: item.pivot.z}, material: this.redMat, mass: .5});
            const hinge = this.environment.physics.hinge(this.chassis.body, wheel.body, { pivotA: item.pivot, axisA: item.axis, maxForce: 0.99 });

            if(item.motorized){
                hinge.enableMotor();
            }
            
            return { wheel, hinge, turner: !item.motorized, mover: item.motorized };
        });
        
        
        this.turn(this.turnSpeed);
        this.move(this.speed);

       this.addExtras();
    }
    turn(direction) {
        this.turnSpeed = direction;
        this.wheels.filter(item => item.turner).forEach(item => {item.hinge.axisA.z = this.turnSpeed});
    }
    move(speed){
        this.speed = speed;
        this.wheels.filter(item => item.mover).forEach(item => {item.hinge.setMotorSpeed(this.speed)});
        
    }

    addExtras(){
        const wall1 = this.environment.createBox({size: {x: .2, y: .4, z: 2}, position: { x: 1.4, y: 3.5, z: 0 }, material: this.redMat, mass: .2 });
        this.environment.physics.lock(this.chassis.body, wall1.body);
        const wall2 = this.environment.createBox({size: {x: .2, y: .4, z: 2}, position: { x: -1.4, y: 3.5, z: 0 }, material: this.redMat, mass: .2 });
        this.environment.physics.lock(this.chassis.body, wall2.body);
        const wall3 = this.environment.createBox({size: {x: 1, y: .4, z: .2}, position: { x: 0, y: 3.5, z: -2.4 }, material: this.redMat, mass: .2 });
        this.environment.physics.lock(this.chassis.body, wall3.body);
        const wall4 = this.environment.createBox({size: {x: 1, y: .4, z: .2}, position: { x: 0, y: 3.5, z: 2.4 }, material: this.redMat, mass: .2 });
        this.environment.physics.lock(this.chassis.body, wall4.body);

        const ball = this.environment.createSphere({ size: { r: .4 }, position: { x: 0, y: 3.5, z: 0 }, material: basicColorMaterial('00cc00'), mass: .3 });
    }
}