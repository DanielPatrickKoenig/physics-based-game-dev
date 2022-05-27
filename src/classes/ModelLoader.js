import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {nextTick} from '../utils/Utilities.js';
export default class ModelLoader{
    constructor(file){
        this.file = file;
        
    }
    async load(){
        const loader = new GLTFLoader();
        let model = null;
        loader.load( this.file, ( gltf ) => {
            model = gltf.scene;
        }, undefined, ( error ) => {
            model = error;
            console.error( error );

        } );
        while (model === null){
            await nextTick();
        }
        
        return model;
    }
}