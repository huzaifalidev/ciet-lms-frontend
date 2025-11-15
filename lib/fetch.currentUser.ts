import axios from "axios";
import { setUser, logout } from "@/redux/slices/user.slice";
import { config } from "@/config/config";

export const fetchCurrentUser = async (dispatch: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return dispatch(logout());
    }

    let response = await axios.get(`${config.API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    dispatch(setUser(response.data.user));
    return;
  } catch (err: any) {

    if (err.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return dispatch(logout());

        const refreshRes = await axios.post(`${config.API_URL}/auth/refresh-token`, {}, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        localStorage.setItem("accessToken", refreshRes.data.accessToken);

        const userRes = await axios.get(`${config.API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${refreshRes.data.accessToken}` },
        });

        dispatch(setUser(userRes.data.user));
        return;
      } catch (refreshError) {
        return dispatch(logout());
      }
    }

    console.error("Failed to fetch current user:", err);
    dispatch(logout());
  }
};
