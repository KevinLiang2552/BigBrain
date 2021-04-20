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

// Total amount of points a question gets.
// Also adds and calculates the amount of points a player get for their answering speed
// The player can only get points of interval of 0.05 and the max being 0.5
// Same with the points before it is multiplied by 100
export const getQuestionPoints = (points, timeLeft, duration) => {
  const howFast = Math.ceil((timeLeft / duration) * 10);
  return parseInt(points) * 100 + howFast * 0.05 * 100;
};
