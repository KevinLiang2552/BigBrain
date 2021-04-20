import { createShallow } from '@material-ui/core/test-utils';

import React from 'react';
import QuizTimer from '../components/play/QuizTimer.jsx';

export const testActiveQuizItem = () => {
  describe('quiz timer', () => {
    let shallow;

    beforeEach(() => {
      shallow = createShallow();
    });

    it('quiz timer show timeleft', () => {
      const quizTimer = shallow(<QuizTimer duration={0} timeLeft={4} />);
      expect(quizTimer.text()).toBe('4');
    });

    it('quiz timer renders correctly', () => {
      const quizTimer = shallow(<QuizTimer duration={0} timeLeft={0} />);
      expect(quizTimer).toMatchSnapshot();
    });
  });
};

export default testActiveQuizItem;
