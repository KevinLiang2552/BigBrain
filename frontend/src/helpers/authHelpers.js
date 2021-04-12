// Given email check if it is valid against the regex
export const checkEmailValid = (email) => {
  const emailRegex = /^.+@.+\..+$/;
  return emailRegex.exec(email);
};
