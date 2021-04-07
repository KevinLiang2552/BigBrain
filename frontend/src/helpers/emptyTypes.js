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
  results: {
    active: false,
    answerAvailable: false,
    isoTimeLastQuestionStarted: '',
    position: 0,
    questions: [{}],
    numQuestions: 0,
    players: [],
  },
};
