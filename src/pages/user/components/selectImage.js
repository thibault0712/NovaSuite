export function SelectImage(type){
    if (type === 'Adrenalia'){
        return require(`../../../data/images/logo.png`)
    }else{
        return require('../../../data/images/NovaSuite.png')
    }
}