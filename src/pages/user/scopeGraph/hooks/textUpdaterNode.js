import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

function TextUpdaterNode({ data, isConnectable }) {
  const [textareaValue, setTextareaValue] = useState(data.label);

  const onChange = useCallback((evt) => {
    const newValue = evt.target.value;
    setTextareaValue(newValue);
    console.log(newValue)
    // Mettre à jour la taille du textarea en fonction du contenu
    evt.target.style.height = 'auto'; // Réinitialiser d'abord la hauteur
    evt.target.style.height = `${evt.target.scrollHeight}px`; // Ajuster la hauteur au contenu
  }, []);

  return (
    <div className="border dark:border-gray-500 p-2 rounded-sm dark:bg-gray-600 flex flex-col items-center cursor-move">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="w-full flex flex-col items-center justify-center">
        <textarea
          id="text"
          name="text"
          onChange={onChange}
          value={textareaValue}
          className="text-center text-sm w-full resize-none outline-none focus:border-transparent dark:text-white dark:bg-gray-600 cursor-text"
          rows={1}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
