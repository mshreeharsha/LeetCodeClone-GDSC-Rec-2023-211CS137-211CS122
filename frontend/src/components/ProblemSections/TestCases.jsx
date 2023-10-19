import React from 'react';

const TestCases = ({raw}) => {
  return (
    <div>
      {raw?'Raw Test case':'Graphic test case'}
    </div>
  );
}

export default TestCases;
