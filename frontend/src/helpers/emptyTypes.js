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
  answers: [],
  correctAnswers: [],
  duration: -1,
  id: -1,
  imgSrc: null,
  isoTimeLastQuestionStarted: '',
  isLast: false,
  points: 0,
  question: '',
  type: '',
  videoURL: null,
};
