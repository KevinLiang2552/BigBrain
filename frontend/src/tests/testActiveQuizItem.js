import { shallow } from 'enzyme';
// import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import ActiveQuizItem from '../components/dashboard/activeQuiz/ActiveQuizItem';
import {
  emptyQuizIdDetails,
  emptySessionStatus,
  emptyQuestion,
} from '../helpers/emptyTypes.js';

export const testActiveQuizItem = () => {
  const getSessionStatusAtPostion = (position) => {
    const session = {
      active: false,
      answerAvailable: false,
      isoTimeLastQuestionStarted: '',
      position: -1,
      questions: [],
      numQuestions: 0,
      players: [],
    };
    session.position = position;
    return session;
  };

  const addQuestion = (session, question) => {
    const q = emptyQuestion;
    q.question = question;
    session.questions.push(q);
    return session;
  };

  describe('active quiz item', () => {
    const noop = () => {};

    it('shows status "Lobby" when position equal -1', () => {
      const activeQuizItem = shallow(
        <ActiveQuizItem
          quiz={emptyQuizIdDetails}
          status={emptySessionStatus}
          selectQuiz={noop}
          selectedQuizId={0}
        />,
      );
      expect(activeQuizItem.text()).toBe('Lobby');
    });

    it('shows status "Question 1: Great question" when position equal 0', () => {
      const session = getSessionStatusAtPostion(0);
      addQuestion(session, 'Great question');
      const activeQuizItem = shallow(
        <ActiveQuizItem
          quiz={emptyQuizIdDetails}
          status={session}
          selectQuiz={noop}
          selectedQuizId={0}
        />,
      );
      expect(activeQuizItem.text()).toBe('Question 1: Great question');
    });

    it('shows status "Question 2: second question" when position equal 1', () => {
      const session = getSessionStatusAtPostion(1);
      addQuestion(session, 'first question');
      addQuestion(session, 'second question');

      const activeQuizItem = shallow(
        <ActiveQuizItem
          quiz={emptyQuizIdDetails}
          status={session}
          selectQuiz={noop}
          selectedQuizId={0}
        />,
      );
      expect(activeQuizItem.text()).toBe('Question 2: second question');
    });

    it('shows status "Results" when position equal is position is greater than question length (2)', () => {
      const session = getSessionStatusAtPostion(3);
      addQuestion(session, 'first question');
      addQuestion(session, 'second question');

      const activeQuizItem = shallow(
        <ActiveQuizItem
          quiz={emptyQuizIdDetails}
          status={session}
          selectQuiz={noop}
          selectedQuizId={0}
        />,
      );
      expect(activeQuizItem.text()).toBe('Results');
    });

    it('Active quiz item renders correctly', () => {
      const activeQuizItem = shallow(
        <ActiveQuizItem
          quiz={emptyQuizIdDetails}
          status={emptySessionStatus}
          selectQuiz={noop}
          selectedQuizId={0}
        />,
      );
      expect(activeQuizItem).toMatchSnapshot();
    });
  });
};

export default testActiveQuizItem;
