import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import TextInput from "./TextInput";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import TextInput2 from "./TextInput2";
import PhoneInput2 from "./PhoneInput2";
import LogoutButton from "./LogoutButton";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "../Firebase";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
`;

const Heading = styled.h1`
  font-family: "Rethink Sans", sans-serif;
  font-size: 26px;
  font-weight: 500;
  line-height: 40px;
`;

const NominationForm = () => {
  const [nomineeName, setNomineeName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [error, setError] = useState("");
  const [messageType, setMessageType] = useState("sms");
  const navigate = useNavigate();

  const handleNomineeChange = (event) => {
    setNomineeName(event.target.value);
  };

  const handleContactChange = (event) => {
    setContactInfo(event.target.value);
  };

  const createMessageLink = (phoneNumber) => {
    const message = encodeURIComponent(
      "Hey! I’m inviting you to join us in a unique movement with “Tree Hops” - a web app promoting plant ownership and environmental awareness. Share your plant pics, engage in fun challenges, and be part of a global green chain. Let’s reach a million plant pictures together! Get started here: https://tree-hops.web.app"
    );

    let link;
    if (messageType === "sms") {
      link = `sms:${phoneNumber}?body=${message}`;
    } else if (messageType === "whatsapp") {
      const whatsappNumber = phoneNumber.replace("+", ""); // Remove '+' for WhatsApp link
      link = `https://wa.me/${whatsappNumber}?text=${message}`;
    }

    window.open(link, "_blank");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("User not authenticated");
      return;
    }

    try {
      // Add nomination to the Nominations collection
      const nominationRef = await addDoc(collection(db, "Nominations"), {
        name: nomineeName,
        phoneNumber: contactInfo,
        status: "active",
        createdAt: serverTimestamp(),
      });

      // Update current user's document with the nomination ID
      const userRef = doc(db, "Users", currentUser.uid);
      await updateDoc(userRef, {
        nominations: arrayUnion(nominationRef.id),
      });

      createMessageLink(contactInfo);

      navigate("/nominations");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBack = () => {
    navigate("/nominations");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <BackButton backRoute={handleBack} />
      <LogoutButton />
      <Heading>Nominate a Plant Parent</Heading>
      <TextInput2
        placeholder="Nominee's Name"
        value={nomineeName}
        onChange={handleNomineeChange}
      />
      <PhoneInput2
        placeholder="Phone Number"
        value={contactInfo}
        onChange={handleContactChange}
      />
      <div>
        <input
          type="radio"
          value="sms"
          checked={messageType === "sms"}
          onChange={() => setMessageType("sms")}
        />{" "}
        SMS
        <input
          type="radio"
          value="whatsapp"
          checked={messageType === "whatsapp"}
          onChange={() => setMessageType("whatsapp")}
        />{" "}
        WhatsApp
      </div>
      {error && <div>{error}</div>}
      <Button text="Nominate"  />
    </StyledForm>
  );
};

export default NominationForm;
