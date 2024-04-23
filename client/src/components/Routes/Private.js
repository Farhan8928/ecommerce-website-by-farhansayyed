// Import necessary dependencies
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

// Define the PrivateRoute component
export default function PrivateRoute() {
  // State variables
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  // UseEffect hook to perform side effects
  useEffect(() => {
    // Function to check authentication
    const authCheck = async () => {
      try {
        // Fetch user authentication status from the API
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
        // Check if authentication is successful
        if (res.data.ok) {
          setOk(true); // Set the 'ok' state to true
        } else {
          setOk(false); // Set the 'ok' state to false
        }
      } catch (error) {
        console.error("Error fetching user authentication:", error);
        setOk(false); // Set the 'ok' state to false in case of error
      }
    };

    // Perform authentication check only if the auth token exists
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  // Render the Outlet component if 'ok' state is true, otherwise render Spinner component
  return ok ? <Outlet /> : <Spinner />;
}
