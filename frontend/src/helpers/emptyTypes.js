export const emptyQuizDetails = {
  questions: [{}],
  createdAt: '',
  name: '',
  thumbnail: null,
  owner: '',
  active: null,
  oldSessions: [],
};

export const emptyQuizIdDetails = {
  id: -1,
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
  position: -1,
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

export const defaultErrorModalState = {
  showModal: false,
  errorMessage: '',
};

export const emptyQuizResults = {
  id: 0,
  name: '',
  answer: [],
};
