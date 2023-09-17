import React, { useEffect, useRef } from "react";
import { createSymbolWatcher } from "./helper";

const focusTextArea = (eleRef, position) => {
  const end = eleRef.current?.value?.length;
  eleRef.current?.focus();
  // ✅ Move focus to End of textarea
  if (position) {
    eleRef.current?.setSelectionRange(position, position);
  } else {
    eleRef.current?.setSelectionRange(end, end);
  }
};

const Editor = ({
  value,
  onChange,
  className,
  symbolWatcher,
  escapeListener,
  cursorPosition,
  upDateRef,
}) => {
  const textAreaRef = useRef(null);
  const _symbolCount = useRef(createSymbolWatcher(symbolWatcher, value));

  const handleChange = (e) => {
    onChange(e.target.value, textAreaRef);
  };

  useEffect(() => {
    if (symbolWatcher && value?.length > 0) {
      const prevCount = { ..._symbolCount.current };
      Object.keys(_symbolCount.current || {}).forEach((_symbol) => {
        const currentCount = value.split(_symbol).length - 1;
        if (prevCount[_symbol]?.count < currentCount) {
          _symbolCount.current?.[_symbol]?.increaseCount();
        }
        if (prevCount[_symbol]?.count > currentCount) {
          _symbolCount.current?.[_symbol]?.decreaseCount();
        }
        _symbolCount.current?.[_symbol]?.setCount(currentCount);
      });
    }
    focusTextArea(textAreaRef, cursorPosition);
  }, [value]);

  useEffect(() => {
    const handleEscapeListener = (e) => {
      if (e.key === "Escape") {
        if (escapeListener) escapeListener();
      }
    };
    if (textAreaRef.current) {
      if (upDateRef) {
        upDateRef(textAreaRef);
      }
      window.addEventListener("keyup", handleEscapeListener);
      focusTextArea(textAreaRef, cursorPosition);
    }
    return () => window.removeEventListener("keyup", handleEscapeListener);
  }, []);

  return (
    <textarea
      style={{
        minHeight: "100px",
        minWidth: "150px",
        background: "white",
        border: "1px solid black",
        resize: "none",
      }}
      ref={textAreaRef}
      value={value}
      onChange={handleChange}
      className={`em-editor ${className}`}
    />
  );
};

export default Editor;
