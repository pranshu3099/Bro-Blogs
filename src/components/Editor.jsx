import React, { useState } from "react";
import AceEditor from "react-ace";
import ReactMarkdown from "react-markdown";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";

const EditorComponent = ({ blog, dispatch }) => {
  return (
    <div className="editor-container">
      <AceEditor
        mode="markdown"
        theme="tomorrow_night"
        value={blog?.blogContent || ""}
        name="markdown-editor"
        editorProps={{ $blockScrolling: true }}
        className="markdown-editor"
        onChange={(e) => {
          dispatch({ type: "content", payload: { blogContent: e } });
        }}
      />
    </div>
  );
};

export default EditorComponent;
