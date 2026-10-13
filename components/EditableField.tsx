import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'input' | 'textarea';
  className?: string;
  placeholder?: string;
  multilineRows?: number;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  type = 'input',
  className = '',
  placeholder = '[Click to edit]',
  multilineRows = 1,
}) => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Sync internal state when prop changes
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useLayoutEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (type === 'textarea') {
        const el = inputRef.current as HTMLTextAreaElement;
        el.style.height = 'auto';
        el.style.height = `${Math.max(el.scrollHeight, 40)}px`;
      } else {
        (inputRef.current as HTMLInputElement).select();
      }
    }
  }, [editing, type]);

  const handleBlur = () => {
    setEditing(false);
    if (currentValue !== value) {
      onChange(currentValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCurrentValue(value);
      setEditing(false);
    } else if (e.key === 'Enter' && type === 'input') {
      setEditing(false);
      if (currentValue !== value) {
        onChange(currentValue);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
    if (type === 'textarea') {
      const el = e.target as HTMLTextAreaElement;
      el.style.height = 'auto';
      el.style.height = `${Math.max(el.scrollHeight, 40)}px`;
    }
  };

  const baseEditingClasses = "w-full p-1.5 bg-sky-50 border border-sky-400 rounded text-gray-900 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all";

  if (editing) {
    if (type === 'textarea') {
      return (
        <textarea
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${baseEditingClasses} ${className}`}
          rows={multilineRows}
          placeholder={placeholder}
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
        onKeyDown={handleKeyDown}
        className={`${baseEditingClasses} ${className}`}
        placeholder={placeholder}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      title="Click to edit text"
      className={`group relative cursor-pointer hover:bg-sky-50/80 hover:ring-1 hover:ring-sky-300 rounded px-1 py-0.5 -mx-1 transition-all inline-block ${className}`}
    >
      {value ? (
        <span>{value}</span>
      ) : (
        <span className="text-gray-400 italic text-sm">{placeholder}</span>
      )}
      <span className="no-print opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 text-xs text-sky-500 inline-block align-middle font-normal">
        ✎
      </span>
    </span>
  );
};

export default EditableField;
