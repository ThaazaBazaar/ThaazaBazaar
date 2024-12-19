import React, { useState } from "react";
import "./CSS/Signup.css";
import Select from "react-select";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const countryCodes = [
  { value: "+91", label: "🇮🇳 +91 (India)" },
  // { value: "+1", label: "🇺🇸 +1 (USA)" },
  // { value: "+44", label: "🇬🇧 +44 (UK)" },
  // { value: "+61", label: "🇦🇺 +61 (Australia)" },
  // { value: "+81", label: "🇯🇵 +81 (Japan)" },
];

const Signup = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [selectedCode, setSelectedCode] = useState(countryCodes[0]);

  // const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // loading state
  const [loading, setLoading] = useState(false);
  const sendOtp = async () => {
      if (name.trim().length === 0) {
          alert("Please enter a valid name.");
          return;
      }
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
      }
    setLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(`+91${phoneNumber}`),
      });
      const data = await response.json();
      if (data.success) {
        setOtpSent(true);
        alert("OTP sent!");
      } else {
        alert(data.message || "Failed to send OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const verifyOtp = async () => {
    const fullNumber = `+91${phoneNumber}`;
    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: fullNumber, otp }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({ phoneNumber: fullNumber })
        );
        alert("OTP verified! You are logged in.");
        navigate("/"); // Redirect to Home
      } else {
        alert(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  // eslint-disable-next-line
  const handleGenerateOTP = () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }
    const fullNumber = `+91${phoneNumber}`;
    alert(`OTP sent to: ${fullNumber}`);
    // Add your API call to generate OTP here
  };

  return (
    <>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          {!otpSent ? (
            <>
              <div className="loginsignup-fields">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  
                />
                <label>Select Country Code:</label>
                <Select
                  className="countrycode-select"
                  options={countryCodes}
                  value={selectedCode}
                  onChange={(option) => setSelectedCode(option)}
                />

                {/* Phone Number Input */}
                <label>Phone Number:</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  // style={{
                  //   width: "100%",
                  //   padding: "10px",
                  //   margin: "10px 0",
                  //   fontSize: "16px",
                  //   borderRadius: "5px",
                  //   border: "1px solid #ccc",
                  // }}
                />
                {/* <input type="checkbox" name="country" id="" />
          <input type="mobile" placeholder="Your Mobile" /> */}
              </div>
              <button onClick={sendOtp} disabled={loading}>
                {loading ? <LoadingSpinner /> : "Generate OTP"}
              </button>
            </>
          ) : (
            <div>
              <label>Enter OTP:</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={verifyOtp}>Verify OTP</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
