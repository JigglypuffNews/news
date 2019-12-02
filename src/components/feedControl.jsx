import React, { useState } from 'react';

const FeedControl = props => {
  const [inputField, updateField] = useState('');
  return (
    <>
      <div>
        <div id="greetingBox">
          <h1>Welcome back, {props.profile.name.givenName}</h1>
          <img id="linkedInPic" src={props.profile.photos[0].value} />
        </div>
        <div id="interestFieldBox">
          <input onChange={e => updateField(e.target.value)} type="text" />
          <button
            onClick={() =>
              props.sendInterests(inputField)
            }
          >
            Add Interest
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedControl;
