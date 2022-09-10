import CustomMeshController from '../controllers/CustomMeshController';
import { basicColorMaterial } from '../../utils/THREEHelpers';
import * as THREE from 'three';
import { degreesToRadians } from '../../utils/Utilities';
export default class PinataController extends CustomMeshController{
    constructor(data){
        super(data, 'https://danielpatrickkoenig.github.io/shared-app-resources/pinata3.glb');

        // const basePositions = this.getBasePositions();

        this.onPinataMoved = null;
        this.links = [];
        this.pipes = [];
        this.pinata = null;
    }
    modelLoaded(model){
        model.scale.z = -1;
        model.scale.x = -1;
        const redMat = basicColorMaterial('cc0000');
        const chainProps = { start: {x: 0, y: 16, z: 0}, jump: 1.125 };
        const chainTop = this.environment.createSphere({size: {r: .2}, position: chainProps.start, material: redMat, mass: 0 });
        this.links = [...new Array(6).keys()].map(item => this.environment.createSphere({size: { r: .2 }, position: { ...chainProps.start, y: chainProps.start.y - (chainProps.jump * (item + 1)) }, material: redMat, mass: 1 }));
        // this.links = [...new Array(6).keys()].map(item => this.environment.createSphere({size: { r: .2 }, position: basePositions.links[item], material: redMat, mass: 1 }));
        this.links.forEach((item, index) => {
            const lastObj = index === 0 ? chainTop.body : this.links[index - 1].body;
            this.environment.physics.createHinge(lastObj, item.body, .5);

        });

        this.pinata = this.environment.createBox({size: {x: 2, y: 1, z: 3}, position: { ...chainProps.start, y: chainProps.start.y - (chainProps.jump * (this.links.length)) - (chainProps.jump * 2) }, customMesh: model, mass: 20 });
        // this.pinata = this.environment.createBox({size: {x: 2, y: 1, z: 3}, position: basePositions.pinata, material: redMat, mass: 20 });
        this.environment.physics.createHinge(this.links[this.links.length - 1].body, this.pinata.body, 1);

        this.pipes = this.links.map((item, index) => {
            const container = new THREE.Object3D();
            const innerContainer = new THREE.Object3D();
            const blueMat = basicColorMaterial('0000cc');
            const pipe = this.environment.createCylinder({ size: {r: .1, y: 1.5}, position: { x: 0, y: 0, z: 0 }, material: blueMat })
            
            this.links[index].mesh.add(container);
            container.add(innerContainer);
            innerContainer.add(pipe.mesh);
            innerContainer.rotation.x = degreesToRadians(90);
            innerContainer.position.z = .75 

            // container.rotation.x = degreesToRadians(90);
            // container.rotation.z = degreesToRadians(90);
            // container.rotation.y = degreesToRadians(90);
            const start = item.mesh;
            const end = index === this.links.length - 1 ? this.pinata.group : this.links[index + 1].mesh;
            return {start, end, container};

        });
        
        
    }
    update(){
        // console.log({ p: this.pinata, l: this.links });
        if(this.pinata && this.onPinataMoved){
            this.onPinataMoved({ position: this.pinata.mesh.position, rotation: this.pinata.mesh.rotation });
        }
        this.pipes.forEach((item, index) => {
            if(item.end && item.end.position && index < this.pipes.length - 1){
                item.container.lookAt(item.end.position);
            }
            
        });
        // for(let i = 0; i < this.links.length; i++){
        //     this.pipes[i].pipe.position.x = this.links[i].mesh.position.x;
        //     this.pipes[i].pipe.position.y = this.links[i].mesh.position.y;
        //     this.pipes[i].pipe.position.z = this.links[i].mesh.position.z;
        // }
        // if(this.links.length && this.pipes.length){
        //     this.pipes.forEach((item, index) => {
        //         console.log(item);
                
        //     });
        // }
        
    }

    getBasePositions () {
        return {
            links: JSON.parse('[{"x":0.25000260531054147,"y":15.279178231653827,"z":0.2496779888851987},{"x":0.2500080232775214,"y":13.851506029054319,"z":0.24902614736459736},{"x":0.2500140677826064,"y":12.424187436325294,"z":0.2483506005567428},{"x":0.25002093127805625,"y":10.99730527686605,"z":0.24765474425916392},{"x":0.25002857564798175,"y":9.570933042333886,"z":0.24694369934367674},{"x":0.2500365156923629,"y":8.145140711104311,"z":0.246222896756961}]'),
            pinata: JSON.parse('{"x":0.24926154920356008,"y":5.316430174930662,"z":0.2621179257249421}')
        }
    }
}