import { PopupObjective } from "./popupObjective";
import { FindObjectiveById } from "../components/findObjectiveById";
import Xarrow from "react-xarrows";

export function RenderObjectives (node, objective, level, i, color, objectives, documents, selectedDocument, setUpdate, blockedNodes, numberChild, lastObjective){
    return (
      <div key={objective.id} className="relative">
        {PopupObjective({ title: objective.title, content: objective.content, make: objective.make, id: objective.id, image: objective.image }, documents[selectedDocument].id, node, setUpdate, objective.make, lastObjective, blockedNodes)}
        {level !== 0 &&(
            <Xarrow
            start={lastObjective.id} //can be react ref
            end={objective.id} //or an id
            startAnchor="bottom"
            endAnchor="top"
            strokeWidth={2}
            lineColor={`${lastObjective.make === false ? "#f87171" : "#4ade80"}`}
            headColor={`${lastObjective.make === false ? "#f87171" : "#4ade80"}`}
            headSize={6}
            curveness={1}
            path="grid"
            gridBreak='30%'
        />
        )}

        {objective.childrens && (
          <div className="flex row-auto">
            {objective.childrens.map((child, numberChild) => RenderObjectives(node, FindObjectiveById(child, i, objectives), level + 1, i, color, objectives, documents, selectedDocument, setUpdate, blockedNodes, numberChild, objective))}
          </div>
        )}
      </div>
    );
  };