import { useCallback, useRef, useMemo } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    Background
  } from 'reactflow';
import TextUpdaterNode from "./textUpdaterNode";
import { GetNodes } from "../synchronization/synchronizationNodes";
import { HandleNewNode } from "../handleClick/handleNewNode";
import { HandleNewEdges } from "../handleClick/handleNewEdges";
import { SynchronizationEdges } from "../synchronization/synchronizationEdges";
import { HandleRemoveNode } from "../handleClick/handleRemoveNode"
import { HandleRemoveEdges } from "../handleClick/handleRemoveEdges"
import { HandleDragNode } from "../handleClick/handleDragNode"


export const Nodes = ({element, fitViewOptions}) => {
    const reactFlowWrapper = useRef(null)
    const connectingNodeId = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const { project } = useReactFlow()
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

    GetNodes(setNodes)
    SynchronizationEdges(setEdges)

    const nodeTypes = useMemo(
        () => ({
            textUpdater: TextUpdaterNode,
        }),
        []
    );
  
    const onConnectStart = useCallback((_, { nodeId }) => {
      connectingNodeId.current = nodeId;
    }, []);

    const onNodesDelete = useCallback((event) => {
      HandleRemoveNode(element, event[0])
    }, [element])

    const onNodeDragStop = useCallback((event, node) => {
      HandleDragNode(element, node)
    }, [element])

    const onEdgesDelete = useCallback((event) => {
      HandleRemoveEdges(element, event)
    }, [element])
  
    const onConnectEnd = useCallback(
      (event) => {
        const targetIsPane = event.target.classList.contains('react-flow__pane');
        console.log(targetIsPane)
  
        if (targetIsPane) {
          // we need to remove the wrapper bounds, in order to get the correct position
          const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
          const id = (parseInt(nodes[nodes.length - 1].id) + 1).toString();
          const newNode = {
            id,
            // we are removing the half of the node width (75) to center the new node
            position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
            data: { label: `Node`, id: id },
            type: 'textUpdater'
          };
          const newEdges = {
            id, 
            source: connectingNodeId.current,
            target: id
          }

          HandleNewNode(element, newNode)
          HandleNewEdges(element, newEdges)

          setNodes((nds) => nds.concat(newNode));
          setEdges((eds) => eds.concat(newEdges));
        }
      },
      [project, setNodes, setEdges, element, nodes]
    );
  
    return (
      <div style={{ width: '100%', height: '100vh' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          nodeTypes={nodeTypes}
          onNodeDragStop={onNodeDragStop}
          fitView
          fitViewOptions={fitViewOptions}
        >
        <Background/>
        </ReactFlow>
      </div>
    );
  };
