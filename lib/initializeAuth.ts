"use client";
import axios from "axios";
import { setUser, logout } from "@/redux/slices/user.slice";
import { config } from "@/config/config";

export const initializeAuth = async (dispatch: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    dispatch(logout());
    return false;
  }

  try {
    // Try fetching user
    const userRes = await axios.get(`${config.API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (userRes.status === 200) {
      dispatch(setUser({
        ...userRes.data.user,
        accessToken,
        refreshToken
      }));
      return true;
    }
  } catch (err: any) {
    // If access token expired → refresh token
    if (err.response?.status === 401 || err.response?.status === 403) {
      try {
        const refreshRes = await axios.post(
          `${config.API_URL}/auth/refresh-token`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        if (refreshRes.status === 200) {
          const newAccessToken = refreshRes.data.accessToken;

          localStorage.setItem("accessToken", newAccessToken);

          // fetch user again
          const userRes = await axios.get(`${config.API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });

          dispatch(setUser({
            ...userRes.data.user,
            accessToken: newAccessToken,
            refreshToken
          }));

          return true;
        }
      } catch {
        // refresh token invalid
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(logout());
        return false;
      }
    }
  }

  dispatch(logout());
  return false;
};
