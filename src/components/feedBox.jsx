import React, { useState } from 'react';
import genericImage from '../photos/feedImages/motherBoard.jpg';

function FeedBox(props) {

  let postSkeleton = `{
      "content": {
          "contentEntities": [
              {
                  "entityLocation": "${props.link}",
                  "thumbnails": [
                      {
                          "resolvedUrl": "${props.imageURL}"
                      }
                  ]
              }
          ],
          "title": "${props.title}"
      },
      "distribution": {
          "linkedInDistributionTarget": {}
      },
      "owner": "urn:li:person:${props.linkedinId}",
      "subject": "Found a great article on ${props.interest}",
      "text": {
          "text": "Great article: ${props.summary}"
      }
  }`


  return (
    <>
      <div id="feedBoxOuter">
        <div onClick={props.leftArrowClick} className="arrow-left"></div>
        <div id="feedBoxInner">
          {/* <div className="imageContainer"></div> */}
          <img
            className="imageContainer"
            src={props.imageURL}
            alt="circuit board"
          />
          <div className="textFeedBox">
            <div className="mainTitleFeed">
              <h2>{props.title}</h2>
            </div>
            <div className="feedBoxSummary">
              <div className="feedBoxTextContainer">
                <a href={props.link}>Link to article</a>
                <button onClick={() => props.postArticle(postSkeleton)}>Post to LinkedIn</button>
                <h5>{props.author}</h5>
                <p>{props.summary}</p>
              </div>
            </div>
          </div>
        </div>
        <div onClick={props.rightArrowClick} className="arrow-right"></div>
      </div>
    </>
  );
}

export default FeedBox;
