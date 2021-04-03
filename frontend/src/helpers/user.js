// Get Authorisation token from storage
export const getAuthToken = () => {
  localStorage.getItem('bigBrain-UserAuthToken');
};

// Set Authorisation token from storage
export const setAuthToken = (authToken) => {
  localStorage.setItem('bigBrain-UserAuthToken', authToken);
};
