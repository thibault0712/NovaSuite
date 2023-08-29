export function SelectImage(type){
    if (type === 'Adrenalia'){
        return require(`../../../../../data/images/logo.png`)
    }else if(type === 'ScopeGraph'){
        return require('../../../../../data/images/ScopeGraph.png');
    }else{
        return require('../../../../../data/images/NovaSuite.png')
    }
}