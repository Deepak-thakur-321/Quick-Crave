import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/auth-shared.css';

const UserLogin = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   // Redirect if already logged in
   useEffect(() => {
      const token = localStorage.getItem("user_token");
      if (token) {
         console.log("User already logged in, redirecting to Home...");
         navigate("/", { replace: true });
      }
   }, [navigate]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      const email = e.target.email.value.trim();
      const password = e.target.password.value;

      if (!email || !password) {
         setError("Both email and password are required");
         setLoading(false);
         return;
      }

      try {
         const response = await axios.post(
            "http://localhost:4000/api/auth/user/login",
            { email, password },
            { withCredentials: true }
         );
         navigate("/", { replace: true }); // THEN redirect to home


         const { token, message } = response.data;

         if (token) {
            localStorage.setItem("user_token", token); // Save token first
         } else {
            setError(message || "Login failed: no token received");
         }
      } catch (err) {
         console.error("Login error:", err.response?.data || err.message);
         setError(err.response?.data?.message || "Login failed due to server error");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="auth-page-wrapper">
         <div className="auth-card">
            <header>
               <h1 className="auth-title">Welcome back</h1>
               <p className="auth-subtitle">Sign in to continue your food journey.</p>
            </header>
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
               <div className="field-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
               </div>
               <div className="field-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" name="password" type="password" placeholder="••••••••" required />
               </div>
               {error && <p className="auth-error">{error}</p>}
               <button className="auth-submit" type="submit" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
               </button>
            </form>
            <div className="auth-alt-action">
               New here? <Link to="/user/register">Create account</Link>
            </div>
         </div>
      </div>
   );
};

export default UserLogin;
