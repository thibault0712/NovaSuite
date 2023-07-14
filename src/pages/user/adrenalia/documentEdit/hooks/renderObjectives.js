import { PopupObjective } from "./popupObjective";
import { FindObjectiveById } from "../components/findObjectiveById";
import './styles/arrow.css'
import Xarrow from "react-xarrows";

export function RenderObjectives (node, objective, level, i, color, objectives, documents, selectedDocument, setUpdate, blockedNodes, formData, setFormData, setFile, file, element, numberChild, lastObjective){
    return (
      <div key={objective.id} className={`relative ${objective.parents.length === 0 ? "mr-10" : ""}`}>
        {PopupObjective(objective, documents[selectedDocument].id, node, setUpdate, objective.make, lastObjective, objectives, formData, setFormData, element)}
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
            {objective.childrens.map((child, numberChild) => RenderObjectives(node, FindObjectiveById(child, i, objectives), level + 1, i, color, objectives, documents, selectedDocument, setUpdate, blockedNodes, formData, setFormData, setFile, file, element, numberChild, objective))}
          </div>
        )}

      </div>
    );
  };