// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import testErrorModal from './tests/testErrorModal.js';
import testPasswordInput from './tests/testPasswordInput';
import testActiveQuizItem from './tests/testActiveQuizItem';
import testQuizTime from './tests/testQuizTimer';

testErrorModal();
testPasswordInput();
testActiveQuizItem();
testQuizTime();
