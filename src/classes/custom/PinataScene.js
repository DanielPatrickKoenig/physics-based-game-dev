import { basicColorMaterial } from '../../utils/THREEHelpers';
import BaseScene from '../BaseScene';
import LightController, { LightTypes } from '../../classes/controllers/LightController';
import PinataController from './PinataController';
export default class PinataScene extends BaseScene{
    constructor(el){
        super(el);
        this.pinata = null;
    }
    initialize(){
        const lc = new LightController({ environment: this.environment });
        lc.addLight({ type: LightTypes.DIRECTIONAL, intensity: 4, target: { x: 0, y: -10, z: -5 } });

        this.environment.cameraContainer.position.y = 6;
        this.environment.cameraContainer.position.z = 20;

        new PinataController({ environment: this.environment });

    }
    
}