import React from 'react';
import Editor from "@monaco-editor/react";
const Code = ({split}) => {
  const code = `#include <bits/stdc++.h> \nusing namespace std;\n
int main() { \n   cout<<\"Hello world\"<<endl; \n}`;
  return (
    <>
    <Editor
      height={`${split?'25rem':'39rem'}`}
      language="C++"
      theme="vs-dark"
      value={code}
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
