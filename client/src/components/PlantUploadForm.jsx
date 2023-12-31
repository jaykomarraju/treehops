import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import TextInput from "./TextInput";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db, auth } from "../Firebase";
import LongTextInput from "./LongTextInput";
// import { collection, addDoc, serverTimestamp,  } from "firebase/firestore";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  // background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(90vw - 40px);
  max-width: 600px;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
`;

const Heading = styled.h3`
  font-family: "Rethink Sans", sans-serif;
  font-size: 27px;
  margin: 20px;
  margin-bottom: 40px;
  font-weight: 500;
  text-align: center;
  color: #111;
`;



const PlantUploadForm = () => {
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleIdeaTitleChange = (event) => {
    setIdeaTitle(event.target.value);
  };

  const handleIdeaDescriptionChange = (event) => {
    setIdeaDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!ideaTitle || !ideaDescription) {
      setError("Please fill in both the title and description of your idea");
      return;
    }

    try {
      const userId = auth.currentUser.uid;

      // Add a new document in Firestore
      const docRef = await addDoc(collection(db, "Ideas"), {
        userId,
        title: ideaTitle,
        description: ideaDescription,
        timestamp: serverTimestamp(),
      });

      const userDocRef = doc(db, "Users", userId);
      await updateDoc(userDocRef, {
        ideasCreated: serverTimestamp(), // If storing the timestamp of creation
        // If storing the idea IDs in an array
        ideasCreated: arrayUnion(docRef.id),
      });

      // Clear the form and provide feedback
      setIdeaTitle("");
      setIdeaDescription("");
      alert("Idea Sparked successfully!");
    } catch (error) {
      console.error("Error submitting idea: ", error);
      setError("Error submitting idea");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <BackButton backRoute={handleBack} />
      <LogoutButton />
      <Wrapper>
      <Heading>Spark an Idea</Heading>
      <TextInput
        placeholder="Enter your idea title"
        value={ideaTitle}
        onChange={handleIdeaTitleChange}
      />
      <LongTextInput
          placeholder="Describe your idea"
          value={ideaDescription}
          onChange={handleIdeaDescriptionChange}
        />
      {error && <div>{error}</div>}
      <Button text="Spark Idea" onClick={handleSubmit} />
      </Wrapper>
    </StyledForm>
  );
};

export default PlantUploadForm;
