import React, { useCallback, useState } from "react";

export const Select = ({ value, onValueChange, children, placeholder = "Select option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelect = useCallback((selectedValue) => {
    onValueChange(selectedValue);
    setIsOpen(false);
  }, [onValueChange]);
  
  return (
    <div className="relative">
      <button
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-md border border-gray-300 bg-white shadow-lg">
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              onClick: () => handleSelect(child.props.value)
            })
          )}
        </div>
      )}
    </div>
  );
};

export const SelectItem = ({ value, children }) => (
  <div
    className="relative flex cursor-pointer select-none items-center rounded-sm py-2 px-3 text-sm hover:bg-gray-100"
    // onClick={onClick}
  >
    {children}
  </div>
);