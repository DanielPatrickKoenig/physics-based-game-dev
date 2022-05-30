import BaseScene from '../BaseScene';
import LightController, {LightTypes} from '../controllers/LightController';
import GroundController from '../controllers/GroundController';
import BatterUpController from '../controllers/BatterUpController';
import Walker1Controller from '../controllers/Walker1Controller';
import Walker2Controller from '../controllers/Walker2Controller';
import AutoNavigationController from '../controllers/AutoNavigationController';
import CheckpointController from '../controllers/CheckpointController';
import { POVModes } from '../POVManager';
export default class ExampleSceneWithCharacterAndAutonavigation extends BaseScene{
    constructor(el){
        super(el);
    }
    initialize(){

        const lightController = new LightController({environment: this.environment});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: 1.5, target: {x: 20, y: 0, z: 15}});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: .5, target: {x: -5, y: 0, z: -22}});


        new GroundController({environment: this.environment}, 'https://danielpatrickkoenig.github.io/spirit-of-kovak/dist/dirt_row.png');

        new BatterUpController({environment: this.environment});
        
        const walker = new Walker1Controller({environment: this.environment});
        new Walker2Controller({environment: this.environment});

        new AutoNavigationController({environment: this.environment}, [{x: 9, y: 0, z: 5}, {x: 9, y: 0, z: 8}, {x: 12, y: 0, z: 8}, {x: 14, y: 0, z: 8}, {x: 14, y: 0, z: 12}, {x: 19, y: 0, z: 12}], walker);

        const checkpoints = [];

        checkpoints.push(new CheckpointController({environment: this.environment}, {x: 12, y: 0, z: 8}, walker, () => this.onCheckpoint(0) ));
        checkpoints.push(new CheckpointController({environment: this.environment}, {x: 14, y: 0, z: 12}, walker, () => this.onCheckpoint(1) ));
    }

    onCheckpoint(index){
        this.emitActionHandler(index, 'checkpoint');
    }

    getPOVMode(){
        return POVModes.ISOPERSPECTIVE;
    }
}