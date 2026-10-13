
import React, { useState, useRef, useLayoutEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'input' | 'textarea';
  className?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange, type = 'input', className = '' }) => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (editing && inputRef.current) {
        inputRef.current.focus();
        if (type === 'textarea') {
            const el = inputRef.current as HTMLTextAreaElement;
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }
    }
  }, [editing, type]);

  const handleBlur = () => {
    setEditing(false);
    onChange(currentValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
    if (type === 'textarea') {
        const el = e.target as HTMLTextAreaElement;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }
  };
  
  const commonClasses = "w-full p-0 m-0 bg-transparent border-none focus:ring-0 focus:outline-none resize-none";

  if (editing) {
    if (type === 'textarea') {
      return (
        <textarea
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${commonClasses} ${className}`}
          rows={1}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.Ref<HTMLInputElement>}
        type="text"
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${commonClasses} ${className}`}
      />
    );
  }

  return (
    <span onClick={() => setEditing(true)} className={`cursor-pointer hover:bg-sky-100 rounded p-1 -m-1 ${className}`}>
      {value || <span className="text-gray-400">[empty]</span>}
    </span>
  );
};

export default EditableField;
