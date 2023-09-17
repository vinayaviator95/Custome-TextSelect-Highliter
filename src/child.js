import React from "react";
import Editor from "./Editor";

const Child = ({
  onPostContentChange,
  selectedPost,
  editorSymbolWatcher,
  onEditingCancel,
  cursorPosition,
  upDateRef,
}) => {
  return (
    <Editor
      onChange={onPostContentChange}
      value={selectedPost?.content}
      className="post-content-textarea"
      symbolWatcher={editorSymbolWatcher}
      escapeListener={onEditingCancel}
      cursorPosition={cursorPosition}
      upDateRef={upDateRef}
    />
  );
};

export default Child;
