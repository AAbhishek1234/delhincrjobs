// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { db } from "../firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// const CompanyAuth = () => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [companyName, setCompanyName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [otpSent, setOtpSent] = useState(false);

//   const navigate = useNavigate();
//   const auth = getAuth();

//   const setUpRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//       size: "invisible",
//       callback: () => {},
//     });
//   };

//   const sendOtp = async () => {
//     if (!phoneNumber) return alert("Please enter phone number");
//     setUpRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const result = await signInWithPhoneNumber(auth, "+91" + phoneNumber, appVerifier);
//       setConfirmationResult(result);
//       setOtpSent(true);
//       alert("OTP sent to your phone");
//     } catch (error) {
//       console.error("OTP Error:", error);
//       alert(error.message);
//     }
//   };

//   const verifyOtpAndRegister = async () => {
//     if (!otp || !confirmationResult) return alert("Enter OTP");

//     try {
//       await confirmationResult.confirm(otp); // OTP verified

//       // Proceed with email + password registration
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const uid = userCredential.user.uid;

//       await setDoc(doc(db, "companies", uid), {
//         companyName,
//         email,
//         phoneNumber,
//         createdAt: new Date(),
//       });

//       localStorage.setItem("companyId", uid);
//       navigate("/AdminPannel");
//     } catch (error) {
//       console.error("OTP Verification Failed:", error);
//       alert("Invalid OTP or error occurred");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (isRegister) {
//         if (!otpSent) {
//           return sendOtp(); // first send OTP
//         } else {
//           return verifyOtpAndRegister(); // then verify OTP and register
//         }
//       } else {
//         // LOGIN
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const uid = userCredential.user.uid;

//         const companyRef = doc(db, "companies", uid);
//         const companySnap = await getDoc(companyRef);

//         if (companySnap.exists()) {
//           localStorage.setItem("companyId", uid);
//           navigate("/AdminPannel");
//         } else {
//           alert("Access denied: No company profile found.");
//         }
//       }
//     } catch (error) {
//       console.error("Auth Error:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-bold text-center mb-4">
//         {isRegister ? "Register Your Company" : "Employers Login"}
//       </h2>
//       <form onSubmit={handleSubmit}>
//         {isRegister && (
//           <>
//             <input
//               type="text"
//               placeholder="Company Name"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               className="w-full mb-3 px-4 py-2 border rounded"
//               required
//               autoComplete="organization"
//             />
//             <input
//               type="text"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full mb-3 px-4 py-2 border rounded"
//               required
//             />
//           </>
//         )}
//         <input
//           type="email"
//           placeholder="Your EmailId"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-3 px-4 py-2 border rounded"
//           required
//           autoComplete="email"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-3 px-4 py-2 border rounded"
//           required
//           autoComplete="current-password"
//         />

//         {isRegister && otpSent && (
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full mb-3 px-4 py-2 border rounded"
//             required
//           />
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {isRegister ? (otpSent ? "Verify & Register" : "Send OTP") : "Login"}
//         </button>
//       </form>

//       <p className="text-center mt-4 text-sm text-gray-500">
//         {isRegister ? "Already have an account?" : "Not Registered as Employer?"}{" "}
//         <button
//           onClick={() => {
//             setIsRegister(!isRegister);
//             setOtpSent(false);
//             setOtp("");
//             setPhoneNumber("");
//           }}
//           className="text-blue-600 underline"
//         >
//           {isRegister ? "Login" : "Create Account"}
//         </button>
//       </p>
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default CompanyAuth;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CompanyAuth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        // Register
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const uid = userCredential.user.uid;

        await setDoc(doc(db, "companies", uid), {
          companyName,
          email,
          phoneNumber,
          createdAt: new Date(),
        });

        localStorage.setItem("companyId", uid);
        navigate("/AdminPannel");
      } else {
        // Login
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const uid = userCredential.user.uid;

        const companyRef = doc(db, "companies", uid);
        const companySnap = await getDoc(companyRef);

        if (companySnap.exists()) {
          localStorage.setItem("companyId", uid);
          navigate("/AdminPannel");
        } else {
          alert("Access denied: No company profile found.");
        }
      }
    } catch (error) {
      console.error("Auth Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold text-center mb-4">
        {isRegister ? "Register Your Company" : "Employers Login"}
      </h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
              required
              autoComplete="organization"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Your EmailId"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded"
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded"
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-500">
        {isRegister ? "Already have an account?" : "Not Registered as Employer?"}{" "}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setCompanyName("");
            setPhoneNumber("");
          }}
          className="text-blue-600 underline"
        >
          {isRegister ? "Login" : "Create Account"}
        </button>
      </p>
    </div>
  );
};

export default CompanyAuth;
