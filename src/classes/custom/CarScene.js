import BaseScene from '../BaseScene';
import LightController, { LightTypes } from '../../classes/controllers/LightController';
import GroundController from '../../classes/controllers/GroundController';
import CarController from './CarController';
export default class CarScene extends BaseScene{
    constructor(el){
        super(el);
        this.carController = null;
    }
    initialize(){
        const lc = new LightController({ environment: this.environment });
        lc.addLight({ type: LightTypes.DIRECTIONAL, intensity: 4, target: { x: 0, y: -10, z: -5 } });

        new GroundController({environment: this.environment}, 'https://danielpatrickkoenig.github.io/spirit-of-kovak/dist/dirt_row.png');

        this.environment.cameraContainer.position.y = 3;
        this.environment.cameraContainer.position.z = 20;

        this.carController = new CarController({environment: this.environment});
        this.carController.move(5);
        this.carController.turn(-.5);



    }
}