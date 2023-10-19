import React,{useState} from 'react';
import Editor from "@monaco-editor/react";
const Code = ({split,code,setCode}) => {

  return (
    <>
    <Editor
      height={`${split?'20rem':'34rem'}`}
      language="C++"
      theme="vs-dark"
      value={code}
      onChange={setCode}
      options={{
        inlineSuggest: true,
        fontSize: "16px",
        formatOnType: true,
        autoClosingBrackets: true,
        minimap: {enabled:'false'}
      }}
    />
    </>
  );
}

export default Code;
