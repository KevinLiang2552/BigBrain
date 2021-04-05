// Get Authorisation token from storage, return empty string if null
export const getAuthToken = () => {
  const authToken = localStorage.getItem('bigBrain-UserAuthToken');
  return authToken === null ? '' : authToken;
};

// Set Authorisation token from storage
export const setAuthToken = (authToken) => {
  localStorage.setItem('bigBrain-UserAuthToken', authToken);
};

// Get Player token from storage, return empty string if null
export const getPlayerToken = () => {
  const authToken = localStorage.getItem('bigBrain-PlayerToken');
  return authToken === null ? '' : authToken;
};

// Set Player token from storage
export const setPlayerToken = (authToken) => {
  localStorage.setItem('bigBrain-PlayerToken', authToken);
};
