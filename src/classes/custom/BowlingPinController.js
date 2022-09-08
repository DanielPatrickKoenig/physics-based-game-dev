import BaseController from '../controllers/BaseController';
import { basicColorMaterial } from '../../utils/THREEHelpers';
export default class BowlingPinController extends BaseController{
    constructor(data, {x, y, z}){
        super(data);
        const greenMat = basicColorMaterial('00cc00');

        this.base = this.environment.createBox({ size: { x: .25, y: .25, z: .25 }, position: { x, y, z }, material: greenMat, mass: 1 });
        this.center = this.environment.createSphere({ size: { r: .5 }, position: { x, y: y + 1.5, z }, material: greenMat, mass: 1 });
        this.top = this.environment.createSphere({ size: { r: .25 }, position: { x, y: y + 3.5, z }, material: greenMat, mass: 1 });

        this.environment.physics.lock(this.base.body, this.center.body);
        this.environment.physics.lock(this.center.body, this.top.body);
    }

    isDown() {
        const angleSum = Math.abs(this.base.mesh.rotation.x) + Math.abs(this.base.mesh.rotation.z);
        return angleSum >= 1;
    }
    
}