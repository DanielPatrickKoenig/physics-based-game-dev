import BaseScene from '../BaseScene';
import LightController, { LightTypes } from '../../classes/controllers/LightController';
import GroundController from '../../classes/controllers/GroundController';
import CarController from './CarController';
import { basicColorMaterial } from '../../utils/THREEHelpers';
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
        this.environment.cameraContainer.position.z = 15;

        this.carController = new CarController({environment: this.environment});
        setTimeout(() => {
            this.carController.move(5);
            this.carController.turn(-.5);
        }, 2000);
        

        [...new Array(500).keys()].forEach(item => {
            const rockSize = (Math.random() * .4) + .1;
            const rock = this.environment.createSphere({size:{r: rockSize / 2}, position: { x: (Math.random() * 30) - 15, y: 0, z: (Math.random() * 30) - 15}, material: basicColorMaterial('00cc00'), mass: 0});

        })



    }
}