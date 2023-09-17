import React, { useState, useRef } from "react";
import "./TextEditor.css"; // We will create this CSS file to apply styling

const TextEditor = () => {
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const getStyledText = () => {
    const buttonWords = ["customer", "store"];
    const regex = new RegExp(`(#(${buttonWords.join("|")}))\\b`, "g");
    const styledText = text.replace(regex, (match) => {
      const buttonText = match.substring(1);
      const isButtonWord = buttonWords.includes(buttonText);
      return `<mark class="${
        isButtonWord ? "highlighted" : ""
      }">${match}</mark>`;
    });

    return <div dangerouslySetInnerHTML={{ __html: styledText }} />;
  };

  const handleInsertWord = (word) => {
    const { current } = textAreaRef;
    if (current) {
      const { selectionStart, selectionEnd } = current;
      const newText =
        text.slice(0, selectionStart) + word + " " + text.slice(selectionEnd); // Add space after the inserted word
      setText(newText);
      // Set the cursor position to the end of the inserted word and space
      current.selectionStart = current.selectionEnd =
        selectionStart + word.length + 1; // Include the space in the length
      current.focus();
    }
  };

  return (
    <>
      <div className="inputbox-textarea rth-container">
        <div className="rth-backdrop">
          <div className="rth-highlights rth-content">
            <span>{getStyledText()}</span>
          </div>
        </div>
        <textarea
          ref={textAreaRef}
          className="rth-input rth-content"
          value={text}
          onChange={handleTextChange}
          placeholder="Start typing..."
        />
      </div>
      <div className="buttons-container">
        <button onClick={() => handleInsertWord("#customer")}>#customer</button>
        <button onClick={() => handleInsertWord("#store")}>#store</button>
      </div>
    </>
  );
};

export default TextEditor;
