// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import testErrorModal from './tests/components/testErrorModal.js';
import testPasswordInput from './tests/components/testPasswordInput';

testErrorModal();
testPasswordInput();
