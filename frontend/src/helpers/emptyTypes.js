export const emptyQuizDetails = {
  questions: [{}],
  createdAt: '',
  name: '',
  thumbnail: null,
  owner: '',
  active: null,
  oldSessions: [],
};

export const emptySessionStatus = {
  active: false,
  answerAvailable: false,
  isoTimeLastQuestionStarted: '',
  position: 0,
  questions: [{}],
  numQuestions: 0,
  players: [],
};

export const emptyQuestion = {
  id: 0,
  type: '',
  question: '',
  duration: 0,
  points: 0,
  answers: [],
  correctAnswers: [],
  imgSrc: null,
  vidSrc: null,
};
