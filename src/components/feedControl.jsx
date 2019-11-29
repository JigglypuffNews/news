import React, { useState } from 'react';

const FeedControl = props => {
  const [inputField, updateField] = useState('');
  console.log(inputField);
  return (
    <>
      <div>
        <input onChange={e => updateField(e.target.value)} type="text" />
        <button
          onClick={() =>
            props.sendInterests([...props.userInterests, inputField])
          }
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default FeedControl;
