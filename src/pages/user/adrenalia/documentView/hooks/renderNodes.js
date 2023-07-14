import { RenderObjectives } from "./renderObjectives";

export function RenderNodes(nodes, objectives, documents, selectedDocument, setUpdate, blockedNodes, element) {
    return nodes
        ?.sort((a, b) => a.node - b.node)
        .map((node, i) => {
            return (
            <div key={i} >
                {i % 2 === 0 && (
                <div className='bg-gray-100 dark:bg-gray-900 overflow-auto min-w-full scrollbar-none'>
                <div style={{minHeight: 300}} className='bg-gray-100 dark:bg-gray-900 flex'>
                    <div className="flex bg-gray-100 dark:bg-gray-900 border-r border-r-slate-700/50 dark:border-r-slate-500/30 relative z-10 mr-5" style={{width: 100, minWidth: 100}}>
                        <div className={`h-full w-2.5 relative ${node.objectives !== node.resolvedObjectives ? "bg-red-500 dark:bg-red-400" : "bg-green-500 dark:bg-green-400"}`}></div>
                            <div className="flex flex-col justify-center w-full">
                            <p className="dark:text-blue-100 text-black text-lg mt-3 text-center">Etape {i+1}</p>
                            <div className="h-full flex items-center justify-center">
                            <p className="dark:text-blue-100 text-black text-sm text-center mb-11">{node.resolvedObjectives}/{node.objectives}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" mb-5 mt-5 flex">
                    {
                    objectives?.length > 0 &&
                    objectives[i]?.filter(objective => objective.parents.length === 0)
                        .sort((a, b) => a.position - b.position)
                        .map(objective => {
                            return RenderObjectives(node, objective, 0, i, "bg-gray-200 dark:bg-gray-900", objectives, documents, selectedDocument, setUpdate, blockedNodes, element);
                        })
                    }
                    </div>
                </div>
                </div>
                )}
                
                {i % 2 !== 0 && (
                <div className='bg-gray-200 overflow-auto min-w-full scrollbar-none'>
                <div style={{minHeight: 300}} className=' bg-gray-200 dark:bg-slate-900 flex'>
                    <div className="flex bg-gray-200 dark:bg-slate-900 border-r border-r-slate-700/50 dark:border-r-slate-500/30 relative z-10 mr-5" style={{width: 100, minWidth: 100}}>
                    <div className={`h-full w-2.5 relative ${node.objectives !== node.resolvedObjectives ? "bg-red-500 dark:bg-red-400" : "bg-green-500 dark:bg-green-400"}`}></div>
                        <div className="flex flex-col justify-center w-full">
                        <p className="dark:text-blue-100 text-black text-lg mt-3 text-center">Etape {i+1}</p>
                        <div className="h-full flex items-center justify-center">
                        <p className="dark:text-blue-100 text-black text-sm text-center mb-11">{node.resolvedObjectives}/{node.objectives}</p>
                        </div>
                    </div>
                    </div>
                    <div className="mb-5 mt-5 flex">
                    {
                    objectives?.length > 0 &&
                    objectives[i]?.filter(objective => objective.parents.length === 0)
                        .sort((a, b) => a.position - b.position)
                        .map(objective => {
                            return RenderObjectives(node, objective, 0, i, "bg-gray-50 dark:bg-gray-900", objectives, documents, selectedDocument, setUpdate, blockedNodes, element);
                        })
                    }
                    </div>
                </div>
                </div>
                )}
            </div>
            );
        })
}