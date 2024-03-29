import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import styled from "styled-components";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import SelectInput from "./SelectInput";
import countryCodes from "../data/CountryCodes.json"; 
import PhoneInput from "./PhoneInput";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");

  const navigate = useNavigate();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  const combineCountryCodeAndPhoneNumber = () => {
    return selectedCountryCode + phoneNumber;
  };

  const userExists = async (phone) => {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("phoneNumber", "==", phone));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSendOtp = async () => {
    const fullPhoneNumber = combineCountryCodeAndPhoneNumber();
    if (await userExists(fullPhoneNumber)) {
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setIsOtpSent(true);
          setOtp("");
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
        });
    } else {
      alert("User with this phone number does not exist.");
    }
  };

  const handleLogin = async () => {
    const fullPhoneNumber = combineCountryCodeAndPhoneNumber();
    try {
      const confirmationResult = window.confirmationResult;
      await confirmationResult.confirm(otp);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed, please check the OTP and try again.");
    }
  };

  return (
    <StyledForm>
      <Logo />
      <Heading>Login</Heading>
      {!isOtpSent ? (
        <>
            <PhoneDiv>
          <SelectInput
            options={countryCodes.map((country) => ({
              value: country.dial_code,
              label: `${country.dial_code}`,
            }))}
            onChange={handleCountryChange}
            value={selectedCountryCode}
            placeholder="Select Country"
          />
          <PhoneInput
            placeholder="Phone Number"
            value={phoneNumber} // Bind to phoneNumber state
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
            </PhoneDiv>
          <Button text="Send OTP" onClick={handleSendOtp} />
          <div id="recaptcha-container"></div>
        </>
      ) : (
        <>
          <TextInput
            placeholder="OTP"
            value={otp} // Bind to otp state
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button text="Login" onClick={handleLogin} />
        </>
      )}
    </StyledForm>
  );
};

export default LoginForm;
