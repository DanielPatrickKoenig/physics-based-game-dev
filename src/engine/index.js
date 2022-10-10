import PinataScene from '../classes/custom/PinataScene';
import CarScene from '../classes/custom/CarScene';
function createScene(element, gameIndex=1){
    switch(gameIndex){
        case 0:{
            return new PinataScene(element);
        }
        case 1:{
            return new CarScene(element);
        }
    }
}
export {createScene};