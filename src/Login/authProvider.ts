import { AuthProvider, HttpError } from "react-admin";

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const API_URL = '';
      const response = await fetch('http://dev.brightora.online:8080/api/v1/auth/token', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,  // Ensure 'email' matches the API's expected key
          password: password,  // Ensure 'password' matches the API's expected key
        })
      });

      if (!response.ok) {
        throw new HttpError("Unauthorized", 401, {
          message: "Invalid username or password",
        });
      }

      const user = await response.json();
      console.log("User:", user);
      const token = user.access_token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
