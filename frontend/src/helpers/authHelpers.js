// Capitalise first letter in word
export const capitalizeFirstLetter = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

// Check every object value and return true if all values at an empty string
export const isObjectValueEmpty = (object) => {
  for (const [, value] of Object.entries(object)) {
    if (value !== '') return false;
  }
  return true;
};

// Given email check if it is valid against the regex
export const checkEmailValid = (email) => {
  const emailRegex = /^.+@.+\..+$/;
  return emailRegex.exec(email);
};
