import { RenderObjectives } from "./renderObjectives";

export function RenderNodes(nodes, objectives, documents, selectedDocument, setUpdate, blockedNodes) {
    return nodes
        ?.sort((a, b) => a.node - b.node)
        .map((node, i) => {
            return (
            <div key={i} >
                {i % 2 === 0 && (
                <div className='bg-slate-700 overflow-auto min-w-full scrollbar-none'>
                <div style={{minHeight: 300}} className='bg-slate-700 flex'>
                    <div className="flex bg-slate-800 border-r relative z-10 mr-5" style={{width: 100, minWidth: 100}}>
                        <div className={`h-full w-2.5 relative ${node.objectives !== node.resolvedObjectives ? "bg-red-500 dark:bg-red-400" : "bg-green-500 dark:bg-green-400"}`}></div>
                            <div className="flex flex-col justify-center w-full">
                            <p className="text-blue-100 text-lg mt-3 text-center">Etape {i+1}</p>
                            <div className="h-full flex items-center justify-center">
                            <p className="text-blue-100 text-sm text-center mb-11">{node.resolvedObjectives}/{node.objectives}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" mb-5 mt-5 flex">
                    {
                        objectives?.length > 0 &&
                        objectives[i]?.map((objective) =>
                            objective.parents.length === 0 && RenderObjectives(node, objective, 0, i, "bg-slate-700", objectives, documents, selectedDocument, setUpdate, blockedNodes)
                        )
                    }
                    </div>
                </div>
                </div>
                )}
                
                {i % 2 !== 0 && (
                <div className='bg-slate-600 overflow-auto min-w-full scrollbar-none'>
                <div style={{minHeight: 300}} className='bg-slate-600 flex'>
                    <div className="flex bg-slate-800 border-r relative z-10 mr-5" style={{width: 100, minWidth: 100}}>
                    <div className={`h-full w-2.5 relative ${node.objectives !== node.resolvedObjectives ? "bg-red-500 dark:bg-red-400" : "bg-green-500 dark:bg-green-400"}`}></div>
                        <div className="flex flex-col justify-center w-full">
                        <p className="text-blue-100 text-lg mt-3 text-center">Etape {i+1}</p>
                        <div className="h-full flex items-center justify-center">
                        <p className="text-blue-100 text-sm text-center mb-11">{node.resolvedObjectives}/{node.objectives}</p>
                        </div>
                    </div>
                    </div>
                    <div className="mb-5 mt-5 flex">
                    {
                        objectives?.length > 0 &&
                        objectives[i]?.map((objective) =>
                            objective.parents.length === 0 && RenderObjectives(node, objective, 0, i, "bg-slate-600", objectives, documents, selectedDocument, setUpdate, blockedNodes)
                        )
                    }
                    </div>
                </div>
                </div>
                )}
            </div>
            );
        })
}