import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { CANDIDATE_API_END_POINT, USER_API_END_POINT } from "../utils/Constant";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("vote_token") || null
  );
  const [userProfile, setUserProfile] = useState([]);

  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  const [liveVoteCount, setLiveVoteCount] = useState([]);

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/signup`,
        userData
      );
      setUser(response.data);
      setLoading(false);
      navigate("/login");
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(
        error.response
          ? error.response.data.message
          : "Registration failed. Please try again."
      );
    }
  };

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        userData
      );
      localStorage.setItem("vote_token", response.data.token);
      setToken(response.data.token);
      setUser(userData);
      setLoading(false);
      toast.success("Logged in successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(
        error.response
          ? error.response.data.error
          : "Login failed. Please try again."
      );
    }
  };

  const profile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${USER_API_END_POINT}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProfile(response.data.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error.response || error);
      alert(
        error.response?.data?.error ||
          "Failed to fetch user profile. Please try again."
      );
      setToken(null);
      localStorage.removeItem("vote_token");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("vote_token");
    setToken(null);
    setUser(null);
    setUserProfile([]);
    navigate("/");
    toast.success("Logged out successfully");
    window.location.reload();
  };

  const changePassword = async (passwordData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${USER_API_END_POINT}/profile/password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success("Password changed successfully!");
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Failed to change password:", error.response || error);
      alert(
        error.response?.data?.error ||
          "Failed to change password. Please try again."
      );
    }
  };

  // Fetch All candidates
  const GetAllCandidates = async () => {
    try {
      const response = await axios.get(`${CANDIDATE_API_END_POINT}/get`);

      setCandidates(response.data.candidates);
    } catch (error) {
      console.error("Failed to fetch candidates:", error.response || error);
      alert(
        error.response?.data?.error ||
          "Failed to fetch candidates. Please try again."
      );
    }
  };

  // Vote

  const vote = async (candidateId) => {
    try {
      const response = await axios.post(
        `https://votingapp-backend-1-n1iy.onrender.com/api/candidate/vote/${candidateId}`, // Update with your actual endpoint
        {}, // No request body is needed
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the user is authenticated
          },
        }
      );
      console.log(response.data.message); // Success message
      toast.success(response.data);

      window.location.reload();
    } catch (error) {
      toast.warn(error.response?.data?.message);
      console.error("Error voting:", error.response?.data || error.message);
      // alert(error.response?.data?.message || "An error occurred");
    }
  };

  // Fetching live vote count
  const voteCount = async () => {
    try {
      const response = await axios.get(`${CANDIDATE_API_END_POINT}/vote/count`);
      console.log(response.data.voteRecord);
      setLiveVoteCount(response.data.voteRecord);
    } catch (error) {
      console.log("can't fetch vote count");
    }
  };

  useEffect(() => {
    GetAllCandidates();
    voteCount();
    if (token) {
      profile();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        loading,
        token,
        userProfile,
        logout,
        changePassword,
        candidates,
        vote,
        liveVoteCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
