export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return getAuthToken() !== null;
};

