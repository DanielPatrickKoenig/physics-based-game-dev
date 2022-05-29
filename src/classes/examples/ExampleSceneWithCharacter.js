import BaseScene from '../BaseScene';
import LightController, {LightTypes} from '../controllers/LightController';
import GroundController from '../controllers/GroundController';
import BatterUpController from '../controllers/BatterUpController';
import Walker1Controller from '../controllers/Walker1Controller';
export default class ExampleSceneWithCharacter extends BaseScene{
    constructor(el){
        super(el);
    }
    initialize(){

        const lightController = new LightController({environment: this.environment});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: 1.5, target: {x: 20, y: 0, z: 15}});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: .5, target: {x: -5, y: 0, z: -22}});


        new GroundController({environment: this.environment}, 'https://danielpatrickkoenig.github.io/spirit-of-kovak/dist/dirt_row.png');

        new BatterUpController({environment: this.environment});
        
        new Walker1Controller({environment: this.environment});
    }
}