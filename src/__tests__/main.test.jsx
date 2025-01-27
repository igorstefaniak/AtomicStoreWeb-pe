import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App.jsx';

test('sprawdza czy prawidłowo renderuje App', () => {
  render(<App />);
  expect(screen.getByText(/Atomic Store/i)).toBeInTheDocument(); 
});
