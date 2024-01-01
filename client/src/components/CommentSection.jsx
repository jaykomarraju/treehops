import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../Firebase";
import Comment from "./Comment";
import { auth } from "../Firebase";

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
  font-family: "Rethink Sans", sans-serif;
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
  font-family: "Rethink Sans", sans-serif;
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
    transition: transform 0.2s ease-out;
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
  font-family: "Rethink Sans", sans-serif;
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

const BarLabel = styled.span`
  font-family: "Rethink Sans", sans-serif;
  font-size: 14px;
  color: #111;
`;

const BarContainer = styled.div`
  width: 50%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const CommentBar = styled.div`
  margin: 20px 0;
  width: 50%;
  max-width: 600px;
  background-color: #e0e0e0; // Default grey background
  border-radius: 10px;
  height: 20px;
  display: flex;
  overflow: hidden; // To ensure rounded corners
`;

const BarSection = styled.div`
  height: 100%;
  transition: width 0.4s ease-in-out;
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

  

  const fetchComments = async () => {
    const forCommentsQuery = query(
      collection(db, "Comments"),
      where("ideaId", "==", ideaId),
      where("side", "==", "for")
    );
    const againstCommentsQuery = query(
      collection(db, "Comments"),
      where("ideaId", "==", ideaId),
      where("side", "==", "against")
    );
  
    try {
      // Function to fetch user data based on userId
      const fetchUserData = async (userId) => {
        const userRef = doc(db, "Users", userId);
        const userSnap = await getDoc(userRef);
        return userSnap.exists() ? userSnap.data() : null;
      };
  
      // Fetch and process "for" comments
      const forCommentsSnapshot = await getDocs(forCommentsQuery);
      const forCommentsData = await Promise.all(
        forCommentsSnapshot.docs.map(async (doc) => {
          const commentData = doc.data();
          const userData = await fetchUserData(commentData.userId);
          return {
            id: doc.id,
            ...commentData,
            author: userData ? userData.name : "Unknown User", // Use appropriate field for user name
          };
        })
      );
  
      // Fetch and process "against" comments
      const againstCommentsSnapshot = await getDocs(againstCommentsQuery);
      const againstCommentsData = await Promise.all(
        againstCommentsSnapshot.docs.map(async (doc) => {
          const commentData = doc.data();
          const userData = await fetchUserData(commentData.userId);
          return {
            id: doc.id,
            ...commentData,
            author: userData ? userData.name : "Unknown User",
          };
        })
      );
  
      setForComments(forCommentsData);
      setAgainstComments(againstCommentsData);
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };
  
 // Function to calculate bar widths
 const calculateBarWidths = () => {
  const totalComments = forComments.length + againstComments.length;
  if (totalComments === 0) return { forWidth: 0, againstWidth: 0 };
  const forWidth = (forComments.length / totalComments) * 100;
  const againstWidth = 100 - forWidth;
  return { forWidth, againstWidth };
};

const { forWidth, againstWidth } = calculateBarWidths();


  useEffect(() => {
    fetchComments();
  }, [ideaId]);

  const postComment = async () => {
    if (!newComment.trim()) {
      // Check if the comment is empty or only whitespace
      alert("Please enter a comment before posting.");
      return;
    }

    try {
      const userId = auth.currentUser.uid;

      // Add a new document in Firestore
      await addDoc(collection(db, "Comments"), {
        ideaId,
        userId,
        text: newComment,
        side: commentSide, // 'for' or 'against'
        timestamp: serverTimestamp(),
      });

      // Clear the comment input field
      setNewComment("");

      // Fetch comments again to update the UI
      fetchComments();
    } catch (error) {
      console.error("Error posting comment: ", error);
      alert("Error posting comment");
    }
  };

  return (
    <CommentsContainer>
      <CommentInput
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment here..."
      />
      <Flexer>
        <Selector
          value={commentSide}
          onChange={(e) => setCommentSide(e.target.value)}
        >
          <option value="for">For</option>
          <option value="against">Against</option>
        </Selector>
        <PostButton onClick={postComment}>Post Comment</PostButton>
      </Flexer>
     {/* Comment Bar with Labels */}
     <BarContainer>
        <BarLabel>For</BarLabel>
        <CommentBar>
          {forWidth > 0 && <BarSection style={{ width: `${forWidth}%`, backgroundColor: '#4caf50' }} />}
          {againstWidth > 0 && <BarSection style={{ width: `${againstWidth}%`, backgroundColor: '#f44336' }} />}
        </CommentBar>
        <BarLabel>Against</BarLabel>
      </BarContainer>


      <SectionTitle>For the Idea</SectionTitle>
      {forComments.map((comment) => (
        <Comment
          key={comment.id}
          text={comment.text}
          author={comment.author}
          timestamp={comment.timestamp.toDate().toLocaleString()}
        />
      ))}

      <SectionTitle>Against the Idea</SectionTitle>
      {againstComments.map((comment) => (
        <Comment
          key={comment.id}
          text={comment.text}
          author={comment.author}
          timestamp={comment.timestamp.toDate().toLocaleString()}
        />
      ))}
    </CommentsContainer>
  );
};

export default CommentSection;
