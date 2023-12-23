import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import TextInput from "./TextInput";
import cameraIcon from "../assets/camera.svg";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import TextInput2 from "./TextInput2";

const FileInputLabel = styled.label`
  background-image: url(${cameraIcon});
  background-size: cover;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: block;
`;

const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
  width: 50px;
  height: 50px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 20px;
  border-radius: 8px;
  border: 2px solid #111;
`;

const PlantUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setFilePreview(null);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Form submission logic
  };

  const handleBack = () => {
    navigate('/dashboard');
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
        <BackButton backRoute={handleBack}/>
      <FileInputLabel htmlFor="file-input">
        <FileInput id="file-input" type="file" onChange={handleFileChange} />
      </FileInputLabel>
      {filePreview && <ImagePreview src={filePreview} alt="Preview" />}
      <TextInput2
        placeholder="Name your plant!"
        value={description}
        onChange={handleDescriptionChange}
      />
      {error && <div>{error}</div>}
      <Button text="Upload Plant" onClick={handleSubmit} />
    </StyledForm>
  );
};

export default PlantUploadForm;
