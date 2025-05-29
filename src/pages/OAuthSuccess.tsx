import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCurrentUser } from "../api/auth";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { data: user, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login?error=NoToken");
      return;
    }
    localStorage.setItem("TRAVEL_ACCESS_TOKEN", token);
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("TRAVEL_ACCESS_TOKEN");
    if (user && token) {
      login(user, token);
      navigate("/dashboard");
    }
  }, [user, login, navigate]);

  if (isLoading) return <p>Loading user...</p>;
  if (isError) return <p>Failed to fetch user info.</p>;

  return <p>Logging in via Google...</p>;
};

export default OAuthSuccess;
