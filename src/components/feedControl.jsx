import React, { useState } from 'react';

const FeedControl = props => {
  const [inputField, updateField] = useState('');
  console.log(inputField);
  console.log(props.profile)
  return (
    <>
      <div>
        <div id="greetingBox">
          <h1>Welcome back, {props.profile.name.givenName}</h1>
          <img src={props.profile.photos[0].value} />
        </div>
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
