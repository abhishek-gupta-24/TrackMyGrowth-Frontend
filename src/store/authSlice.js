import { createSlice } from "@reduxjs/toolkit";

let parsedUser = null;
try {
  const userInfo = localStorage.getItem("userData");
  if (userInfo && userInfo !== "undefined") {
    parsedUser = JSON.parse(userInfo);
    // Check if token is likely expired (1 hour = 3600000 ms)
    if (parsedUser.timestamp && Date.now() - parsedUser.timestamp > 3600000) {
      parsedUser = null;
      localStorage.removeItem("userData");
    }
  }
} catch (e) {
  console.error("Error parsing localStorage userData:", e);
  localStorage.removeItem("userData"); // Clear invalid data
}

const initialState = {
  status: !!parsedUser,
  userData: parsedUser, // { email, token, timestamp }
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = {
        email: action.payload.email,
        token: action.payload.token,
        timestamp: Date.now(),
      };
      //console.log(token)
      state.error = null;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.error = null;
      localStorage.removeItem("userData");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;