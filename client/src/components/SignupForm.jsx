import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import SelectInput from "./SelectInput";
import SuccessModal from "./SuccessModal";
import styled from "styled-components";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import countryCodes from "../data/CountryCodes.json"; // Import the country codes
import PhoneInput from "./PhoneInput";
import { getDocs, query, where, updateDoc, getDoc } from "firebase/firestore";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //   background-color:pink;
`;

const PhoneDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  font-family: "Rethink Sans", sans-serif;
  font-size: 26px;
  font-weight: 500;
  line-height: 40px;
`;

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  useEffect(() => {
    if (auth) {
      console.log("The Auth object is available: ", auth);
    }
  }, [auth]);

  const handleCountryChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    // Concatenate the selected country code with the entered phone number
    setPhoneNumber(e.target.value);
  };

  const combineCountryCodeAndPhoneNumber = () => {
    console.log(selectedCountryCode + phoneNumber);
    return selectedCountryCode + phoneNumber;
  };

  //   useEffect(() => {
  //     if (!window.recaptchaVerifier) {
  //       window.recaptchaVerifier = new RecaptchaVerifier(
  //         "recaptcha", // Ensure this element ID exists
  //         {
  //           'size': "invisible",
  //           'callback': (response) => {
  //             // reCAPTCHA solved, allow signInWithPhoneNumber.
  //           },
  //         },
  //         auth
  //       );
  //     }
  //   }, []);

  const handleSendOtp = async (event) => {
    event.preventDefault();
    let phoneNumber = combineCountryCodeAndPhoneNumber();

    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsOtpSent(true);
        setOtp("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleSignup = async (event) => {
  //   event.preventDefault(); // Prevent default form submission
  //   let otpInput = otp; // Use the OTP from the state
  //   let phoneNumber = combineCountryCodeAndPhoneNumber();

  //   if (otpInput.length === 6) {
  //     let confirmationResult = window.confirmationResult;
  //     try {
  //       const result = await confirmationResult.confirm(otpInput);
  //       console.log(result.user);

  // Check if the user has a valid, unused invitation (implement later)
  // const invitationsRef = collection(db, "Invitations");
  // const querySnapshot = await getDocs(query(invitationsRef, where("receiverPhoneNumber", "==", phoneNumber), where("used", "==", false)));

  // if (querySnapshot.empty) {
  //   alert("No valid invitation found for this phone number.");
  //   return;
  // }

  // // Set invitation as used
  // const invitation = querySnapshot.docs[0];
  // await updateDoc(invitation.ref, { used: true });

  // Create a new document in Firestore for the user
  //       const userDoc = {
  //         userId: result.user.uid,
  //         name: name,
  //         email: email,
  //         phoneNumber: phoneNumber,
  //         uploadedPlants: [],
  //         invitationsSent: [],
  //         inviteStatus: "active",
  //         nominationDeadline: null, // Set after first plant upload
  //       };

  //       // await addDoc(collection(db, "Users"), userDoc);
  //       const userDocRef = doc(db, "Users", userDoc.userId); // Create a reference to the document with the user's UID
  //       await setDoc(userDocRef, userDoc); // Set the document with the userDoc data

  //       // alert("User signed in successfully");
  //       // setShowSuccessModal(true);
  //       navigate("/dashboard"); // Navigate to dashboard or relevant page
  //     } catch (error) {
  //       console.error("Error during user signup: ", error);
  //       alert("User couldn't sign in (bad verification code?)");
  //     }
  //   }
  // };

  const handleSignup = async (event) => {
    event.preventDefault();
    let phoneNumber = combineCountryCodeAndPhoneNumber();
  
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      try {
        const result = await confirmationResult.confirm(otp);
        console.log(result.user);
  
        // Create a new document in Firestore for the user
        const userDoc = {
          userId: result.user.uid,
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          ideasCreated: [],
          invitationsSent: [],
          // inviteStatus: "active",
          // nominationDeadline: null, // Set after first plant upload
        };
  
        const userDocRef = doc(db, "Users", userDoc.userId);
        await setDoc(userDocRef, userDoc);
  
        navigate("/onboard");
      } catch (error) {
        console.error("Error during user signup: ", error);
        alert("User couldn't sign in (bad verification code?)");
      }
    }
  };

  return (
    <StyledForm>
      <Logo />
      <Heading>Sign Up</Heading>
      {!isOtpSent ? (
        <>
          <PhoneDiv>
            <SelectInput
              options={countryCodes.map((country) => ({
                value: country.dial_code,
                //   label: `${country.name} (${country.dial_code})`,
                label: `${country.dial_code}`,
              }))}
              onChange={handleCountryChange}
              value={selectedCountryCode}
              placeholder="Select Country"
            />
            <PhoneInput
              placeholder="Phone Number"
              onChange={handlePhoneNumberChange}
              value={phoneNumber}
              type="tel"
            />
          </PhoneDiv>
          <TextInput
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextInput
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button text="Send OTP" onClick={handleSendOtp} />
          <div id="recaptcha"></div>{" "}
          {/* ID matches the one used in generateRecaptcha */}
        </>
      ) : (
        <>
          <TextInput
            placeholder="OTP"
            value={otp} // Bind value to state
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button text="Sign Up" onClick={handleSignup} />
        </>
      )}
      {/* {showSuccessModal && (
        <SuccessModal
          title="Success!"
          message="You have successfully signed up."
          onClose={() => setShowSuccessModal(false)}
        />
      )} */}
    </StyledForm>
  );
};

export default SignupForm;
