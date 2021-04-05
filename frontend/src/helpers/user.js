// Get Authorisation token from storage, return empty string if null
export const getAuthToken = () => {
  const authToken = localStorage.getItem('bigBrain-UserAuthToken');
  return authToken === null ? '' : authToken;
};

// Set Authorisation token from storage
export const setAuthToken = (authToken) => {
  localStorage.setItem('bigBrain-UserAuthToken', authToken);
};
