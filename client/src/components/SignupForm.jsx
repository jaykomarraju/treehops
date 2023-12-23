import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import styled from "styled-components";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const navigate = useNavigate();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    }, auth);
  }

  useEffect(() => {
    if (auth) { 
        console.log("The Auth object is available: ", auth);
    }   
    }, [auth]);

  const handleSendOtp = async (event) => {
    event.preventDefault();
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsOtpSent(true); // Update state only after successful OTP sending
      })
      .catch((error) => {
        console.log(error); // Consider improving error handling for production
      });
  };

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent default form submission
    let otpInput = otp; // Use the OTP from the state

    if (otpInput.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otpInput)
        .then((result) => {
          console.log(result.user);
          alert("User signed in successfully");
          navigate("/dashboard"); // Navigate to dashboard or relevant page
        })
        .catch((error) => {
          alert("User couldn't sign in (bad verification code?)");
        });
    }
  };

  return (
    <StyledForm>
      <Logo />
      <Heading>Sign Up</Heading>
      {!isOtpSent ? (
        <>
          <TextInput
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button text="Send OTP" onClick={handleSendOtp} />
          <div id="recaptcha"></div> {/* ID matches the one used in generateRecaptcha */}
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
    </StyledForm>
  );
};

export default SignupForm;
