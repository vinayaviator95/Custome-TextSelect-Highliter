import React, { useState, useRef } from "react";
import Editor from "./Editor";
import { Link } from "react-router-dom";
import { formatPost } from "./helper";
import Child from "./child";

const App = () => {
  const [selectedPost, setSelectedPost] = useState({ content: "" });
  const [currentCurPos, setCurrentCurPos] = useState(null);
  const [textRef, setTextRef] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveCancel = () => {
    setIsEditing(false);
  };
  const handleContentUpdate = (content, editorRef) => {
    if (editorRef) {
      const curPos = editorRef?.current?.selectionStart || currentCurPos;
      setTextRef(editorRef);
      setCurrentCurPos(curPos);
    }
    setSelectedPost({ content });
  };
  const handleListItemSelect = (value) => {
    const curPos = textRef?.current?.selectionStart;
    const updatedContent = `${selectedPost?.content?.slice(
      0,
      curPos
    )}${value}${selectedPost?.content?.slice(curPos)}`;

    if (textRef && textRef.current) {
      setCurrentCurPos(curPos + (value?.length || 0));
    }
    setSelectedPost({ content: updatedContent });
  };
  const upDateRef = (elementRef) => {
    setTextRef(elementRef);
  };
  return (
    <>
      {isEditing ? (
        <Child
          selectedPost={selectedPost}
          onEditingCancel={handleSaveCancel}
          onPostContentChange={handleContentUpdate}
          cursorPosition={currentCurPos}
          upDateRef={upDateRef}
          editorSymbolWatcher={[
            {
              symbol: "#",
              callback: ({ symbol }) => {
                console.log(symbol);
              },
            },
          ]}
        />
      ) : (
        <button
          style={{
            minHeight: "100px",
            minWidth: "150px",
            background: "white",
            border: "1px solid black",
          }}
          onClick={() => setIsEditing(true)}
        >
          {selectedPost.content}
        </button>
      )}

      <button onClick={() => handleListItemSelect("#Apple")}>Apple</button>
      <button onClick={() => handleListItemSelect("#Cat")}>cat</button>
    </>
  );
};

export default App;

{
  /* {isEditing ? (
        <Editor
          onChange={handleContentUpdate}
          value={values}
          className="post-content-textarea"
          symbolWatcher={editorSymbolWatcher}
          escapeListener={handleSaveCancel}
          cursorPosition={currentCurPos}
        />
      ) : (
        <p className="post-details-content">{formatPost(values)}</p>
      )} */
}

//   const [isEditing, setIsEditing] = useState(true);
//   const [currentCurPos, setCurrentCurPos] = useState(null);
//   const [values, setValues] = useState();
//   const [textRef, setTextRef] = useState(null);

//   const handleSaveCancel = () => {
//     setIsEditing(false);
//   };

//   const handleContentUpdate = (content, editorRef) => {
//     if (editorRef) {
//       const curPos = editorRef?.current?.selectionStart || currentCurPos;
//       setTextRef(editorRef);
//       setCurrentCurPos(curPos);
//     }
//     setValues(content);
//   };
//   const editorSymbolWatcher = [
//     // {
//     //   symbol: "@",
//     //   callback: ({ symbol }) => {
//     //     setCurrentSymbol(symbol);
//     //     setOpenListModal(true);
//     //   },
//     // },
//     // {
//     //   symbol: "$",
//     //   callback: ({ symbol }) => {
//     //     setCurrentSymbol(symbol);
//     //     setOpenListModal(true);
//     //   },
//     // },
//     {
//       symbol: "#",
//       callback: ({ symbol }) => {
//         console.log(symbol);
//         // setCurrentSymbol(symbol);
//         // setOpenListModal(true);
//       },
//     },
//   ];
