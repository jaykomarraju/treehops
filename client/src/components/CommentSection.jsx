import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CommentInput = styled.textarea`
align-items: center;
background-color: #fff;
border: 2px solid #111;
border-radius: 8px;
box-sizing: border-box;
color: #111;
font-family: 'Rethink Sans', sans-serif;
font-size: 16px;
margin: 10px;
margin-right: 0;
margin-left: 0;
line-height: 24px;
width: 100%;
max-width: 600px;

padding: 15px;
position: relative;
outline: none;
user-select: none;
-webkit-user-select: none;
resize: vertical; // Allows resizing vertically
min-height: 125px; // Minimum height to accommodate paragraphs

&:focus {
    background-color: #e8f0fe;
}

@media (min-width: 768px) {
    padding: 22px;
}
`;

const PostButton = styled.button`
align-items: center;
background-color: #b5b5b5;

border: 2px solid #111;
border-radius: 8px;
box-sizing: border-box;
color: #111;
cursor: pointer;
display: flex;
font-family: 'Rethink Sans', sans-serif;
font-size: 16px;
height: 48px;
justify-content: center;
line-height: 24px;
max-width: 100%;
padding: 0 25px;
position: relative;
margin: 15px;
text-align: center;
text-decoration: none;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;

&:after {
    background-color: #111;
    border-radius: 8px;
    content: "";
    display: block;
    height: 48px;
    left: 0;
    width: 100%;
    position: absolute;
    top: -2px;
    transform: translate(8px, 8px);
    transition: transform .2s ease-out;
    z-index: -1;
}

&:hover:after {
    transform: translate(0, 0);
}

&:active {
    background-color: #09eb68;
    outline: 0;
}

&:hover {
    outline: 0;
    // font-size: 17px;
    // transition: font-size .2s ease-out;
}

@media (min-width: 768px) {
    padding: 0 40px;
}
`;

const SectionTitle = styled.h4`
  font-family: "Rethink Sans", sans-serif;
  margin-top: 20px;
`;

const Selector = styled.select`
// align-items: center;
    background-color: #fff; // White background for dropdown
    border: 2px solid #111;
    border-radius: 8px;
    box-sizing: border-box;
    padding-left: 15px;
    color: #111;
    font-family: 'Rethink Sans', sans-serif;
    font-size: 16px;
    color: #111;
    height: 48px;
    // margin-right: 10px;
    width: 100px;
    position: relative;
    outline: none; // No outline for focused state
    user-select: none;
    -webkit-user-select: none;

    &:focus {
        background-color: #e8f0fe; // Slight background change on focus
    }

`;

const Flexer = styled.div`
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    align-items: center;
`;


const CommentSection = ({ ideaId }) => {
  const [forComments, setForComments] = useState([]);
  const [againstComments, setAgainstComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentSide, setCommentSide] = useState("for"); // 'for' or 'against'

  useEffect(() => {
    const fetchComments = async () => {
      // Fetch "for" comments logic
      // Fetch "against" comments logic
      setForComments([
        {
          id: 1,
          text: "This is a comment for the idea",
          type: "for",
          author: "user1",
          timestamp: "2021-10-01T12:00:00"
        },
        {
            id: 3,
            text: "This is a comment for the idea 2",
            type: "for",
            author: "user2",
            timestamp: "2021-10-01T12:00:00"
        }
      ]);

        setAgainstComments([
        {
          id: 2,
          text: "This is a comment against the idea",
          type: "against",
          author: "user3",
            timestamp: "2021-10-01T12:00:00"
        },
        {
            id: 4,
            text: "This is a comment against the idea 2",
            type: "against",
            author: "user4",
            timestamp: "2021-10-01T12:00:00"
        }
        ]);
    };

    fetchComments();
  }, [ideaId]);

  const postComment = async () => {
    // Add logic to post a new comment, ensuring to include the side (for/against)
  };

  return (
    <CommentsContainer>
      <CommentInput
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment here..."
      />
      <Flexer>
      <Selector value={commentSide} onChange={(e) => setCommentSide(e.target.value)}>
        <option value="for">For</option>
        <option value="against">Against</option>
      </Selector>
      <PostButton onClick={postComment}>Post Comment</PostButton>
      </Flexer>
      <SectionTitle>For the Idea</SectionTitle>
      {forComments.map((comment) => (
        <Comment key={comment.id} text={comment.text} author={comment.author} timestamp={comment.timestamp} />
      ))}

      <SectionTitle>Against the Idea</SectionTitle>
      {againstComments.map((comment) => (
        <Comment key={comment.id} text={comment.text} author={comment.author} timestamp={comment.timestamp}/>
      ))}
    </CommentsContainer>
  );
};

export default CommentSection;
