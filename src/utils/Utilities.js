const ShapeTypes = {
    PLANE: 'plane',
    BOX: 'box',
    SPHERE: 'sphere',
    CYLINDER: 'cylinder'
}
function nextTick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    });
}
function degreesToRadians(value){
    return value * (Math.PI/180);
}
function radiansToDegrees(value){
    return value * (180/Math.PI);
}
function defaultDimensionValues () {
    return {
        size: { x: 1, y: 1, z: 1, r: 1 },
        position: { x: 0, y: 0, z: 0 },
        orientation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
    }
}
function processPointerEvent(e){
    return e.touches && e.touches.length
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX, y: e.clientY };
}
function getInheritanceChain(targetObject){
    const list = [];
    let obj = targetObject;
    while(!obj.constructor || obj.constructor.name !== 'Object'){
        obj = obj.__proto__;
        list.push(obj.constructor.name);
    }
    console.log(list);
    return list;
}
function generateID(){
    return `${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}`;
}
export {nextTick, degreesToRadians, radiansToDegrees, ShapeTypes, defaultDimensionValues, processPointerEvent, generateID, getInheritanceChain};