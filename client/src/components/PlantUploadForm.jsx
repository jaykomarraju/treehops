import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import TextInput from "./TextInput";
import cameraIcon from "../assets/camera.svg";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import TextInput2 from "./TextInput2";
import LogoutButton from "./LogoutButton";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db, storage, auth } from "../Firebase";

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
  max-height: 300px;
  margin-top: 20px;
  border-radius: 8px;
  border: 2px solid #111;
`;

const PlantUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });

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

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          setError("Unable to access your location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const checkIfPlant = async (imageURL) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/is_plant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageURL }),
      });

      const data = await response.json();
      console.log(data);
      return data.is_plant;
    } catch (error) {
      console.error("Error checking if image is a plant: ", error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    try {
      const uploaderId = auth.currentUser.uid;
      const uniqueFileName = `${uploaderId}_${Date.now()}_${selectedFile.name}`;

      // First, upload the file to a temporary location
      const tempStorageRef = ref(storage, `uploads/${uniqueFileName}`);
      await uploadBytes(tempStorageRef, selectedFile);
      const tempImageURL = await getDownloadURL(tempStorageRef);

      // Check if the uploaded image is a plant
      const isPlant = await checkIfPlant(tempImageURL);
      console.log("isPlant: ", isPlant);

      if (!isPlant) {
        setError("Uploaded image is not a plant. Please upload a plant image.");
        return;
      }

      // If it's a plant, proceed with the current process
      const plantStorageRef = ref(storage, `plants/${uniqueFileName}`);
      await uploadBytes(plantStorageRef, selectedFile);
      const imageURL = await getDownloadURL(plantStorageRef);

      // Add a new document in Firestore
      const docRef = await addDoc(collection(db, "Plants"), {
        uploaderId,
        imageURL,
        uploadDate: serverTimestamp(),
        description,
        location,
      });

      // Update the user's uploadedPlants field
      const userRef = doc(db, "Users", uploaderId);
      await updateDoc(userRef, {
        uploadedPlants: arrayUnion(docRef.id),
      });

      // Clear the form and provide feedback
      setSelectedFile(null);
      setFilePreview(null);
      setDescription("");
      alert("Plant uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file: ", error);
      setError("Error uploading file");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <BackButton backRoute={handleBack} />
      <LogoutButton />
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
