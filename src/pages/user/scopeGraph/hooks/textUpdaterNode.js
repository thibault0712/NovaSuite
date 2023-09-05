import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { handleUpdateLabel } from '../handleClick/handleUpdateLabel';
import { useLocation } from 'react-router-dom';

function TextUpdaterNode({ data, isConnectable }) {
  const [textareaValue, setTextareaValue] = useState(data.label);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const element = searchParams.get('element');

  const onChange = useCallback((evt) => {
    const newValue = evt.target.value;
    setTextareaValue(newValue);  
    evt.target.style.height = 'auto';
    evt.target.style.height = `${evt.target.scrollHeight}px`;
  
    if (onChange.timer) {
      clearTimeout(onChange.timer); // Réinitialise le timer si onChange.timer est défini
    }
    
    onChange.timer = setTimeout(() => {
      handleUpdateLabel(element, newValue, data.id)
      onChange.timer = null; // Réinitialise la variable timer
    }, 1000);
  }, [data, element]);

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
