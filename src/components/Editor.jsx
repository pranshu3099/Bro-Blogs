import React, { useState } from "react";
import AceEditor from "react-ace";
import ReactMarkdown from "react-markdown";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";

const EditorComponent = ({ reducer, blog, dispatch }) => {
  const handleChange = (state, action) => {
    reducer(state, action);
  };

  return (
    <div className="editor-container">
      <AceEditor
        mode="markdown"
        theme="tomorrow_night"
        value={blog?.yourblog || ""}
        name="markdown-editor"
        editorProps={{ $blockScrolling: true }}
        className="markdown-editor"
        onChange={(e) => {
          handleChange(blog, { ...blog, yourblog: e, type: "content" });
        }}
      />
    </div>
  );
};

export default EditorComponent;
