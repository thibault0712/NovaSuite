export function FindObjectiveById(objectiveId, i, objectives){
    try{
      const selectedObjective = objectives[i].find((objective) => objective.id === objectiveId);
      return selectedObjective;
    }catch (error){
      return error
    }
  };