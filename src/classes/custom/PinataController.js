import BaseController from '../controllers/BaseController';
import { basicColorMaterial } from '../../utils/THREEHelpers';
export default class PinataController extends BaseController{
    constructor(data){
        super(data);

        const redMat = basicColorMaterial('cc0000');
        const chainProps = { start: {x: 0, y: 16, z: 0}, jump: 1.125 };
        const chainTop = this.environment.createSphere({size: {r: .2}, position: chainProps.start, material: redMat, mass: 0 });
        const chainObjects = [...new Array(6).keys()].map(item => this.environment.createSphere({size: { r: .2 }, position: { ...chainProps.start, y: chainProps.start.y - (chainProps.jump * (item + 1)) }, material: redMat, mass: 1 }));
        chainObjects.forEach((item, index) => {
            const lastObj = index === 0 ? chainTop.body : chainObjects[index - 1].body;
            this.environment.physics.createHinge(lastObj, item.body, .5);

        });

        this.pinata = this.environment.createBox({size: {x: 2, y: 1, z: 3}, position: { ...chainProps.start, y: chainProps.start.y - (chainProps.jump * (chainObjects.length)) - (chainProps.jump * 2) }, material: redMat, mass: 20 });
        this.environment.physics.createHinge(chainObjects[chainObjects.length - 1].body, this.pinata.body, 1);
        
        /*
        setTimeout(() => {
            const forceBase = 5000;
            const force = {
                x: ((Math.random() * forceBase) + forceBase),
                y: (Math.random() * forceBase) + (forceBase / 2),
                z: (Math.random() * (forceBase / 2)) + (forceBase / 5)
            };
            this.environment.physics.addForce(this.pinata.body, force);
            console.log('hit');
        }, 10000);

        const forceBase = 2500;
        setTimeout(() => {
            
            const force = {
                x: ((Math.random() * forceBase) + forceBase) * -1,
                y: (Math.random() * forceBase) + (forceBase / 2),
                z: (Math.random() * (forceBase / 2)) + (forceBase / 5)
            };
            this.environment.physics.addForce(this.pinata.body, force);
            console.log('hit');
        }, 13000);

        setTimeout(() => {
            const force = {
                x: ((Math.random() * forceBase) + forceBase),
                y: (Math.random() * forceBase) + (forceBase / 2),
                z: (Math.random() * (forceBase / 2)) + (forceBase / 5)
            };
            this.environment.physics.addForce(this.pinata.body, force);
            console.log('hit');
        }, 16000);
        setTimeout(() => {
            const force = {
                x: ((Math.random() * forceBase) + forceBase) * -1,
                y: (Math.random() * forceBase) + (forceBase / 2),
                z: (Math.random() * (forceBase / 2)) + (forceBase / 5)
            };
            this.environment.physics.addForce(this.pinata.body, force);
            console.log('hit');
        }, 19000);
        // */
    }
    update(){
        if(this.pinata){
            console.log(this.pinata.mesh.rotation);
        }
        
    }
}