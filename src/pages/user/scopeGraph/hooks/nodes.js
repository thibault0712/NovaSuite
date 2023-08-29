import { useCallback, useRef, useMemo } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    Background
  } from 'reactflow';

  import TextUpdaterNode from "./textUpdaterNode";

export const Nodes = ({initialNodes, getId, fitViewOptions}) => {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { project } = useReactFlow();
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    
    const nodeTypes = useMemo(
        () => ({
            textUpdater: TextUpdaterNode,
        }),
        []
    );
  
    const onConnectStart = useCallback((_, { nodeId }) => {
      connectingNodeId.current = nodeId;
    }, []);
  
    const onConnectEnd = useCallback(
      (event) => {
        const targetIsPane = event.target.classList.contains('react-flow__pane');
  
        if (targetIsPane) {
          // we need to remove the wrapper bounds, in order to get the correct position
          const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
          const id = getId();
          const newNode = {
            id,
            // we are removing the half of the node width (75) to center the new node
            position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
            data: { label: `Node ${id}` },
            type: 'textUpdater'
          };
  
          setNodes((nds) => nds.concat(newNode));
          setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }));
        }
      },
      [project, getId, setNodes, setEdges]
    );
  
    return (
      <div style={{ width: '100%', height: '100vh' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={fitViewOptions}
        >
        <Background/>
        </ReactFlow>
      </div>
    );
  };
