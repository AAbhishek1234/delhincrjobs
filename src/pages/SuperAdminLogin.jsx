import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user.email);

      if (user.email.toLowerCase() === 'bharatsh@gmail.com') {
        localStorage.setItem("superAdminLoggedIn", "true"); // ✅ This was missing
        console.log('Navigating to superadmin...');
        navigate('/superadmin');
      } else {
        console.log('Not a super admin');
        setError('Access Denied: Not a super admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Super Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          className="w-full mb-6 px-4 py-2 border rounded"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <input
          type="password"
          className="w-full mb-6 px-4 py-2 border rounded"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SuperAdminLogin;
