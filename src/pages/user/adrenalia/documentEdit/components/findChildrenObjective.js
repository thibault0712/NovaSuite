export function FindChildrenObjective(parentObjective, i, childrenSelection, objectives){
    try{
      const selectedObjective = objectives[i].find((objective) => objective.id === parentObjective.childrens[childrenSelection]);
      if (selectedObjective.childrens.length > 0){
        return selectedObjective;
      }else{
        return 1
      }
    }catch (error){
      return 0
    }
  };