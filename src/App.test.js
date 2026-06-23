import { render, screen } from '@testing-library/react';
import App from './App';

test('renders nanoWISS homepage', () => {
  render(<App />);
  const heading = screen.getByText(/We make nanoparticles for a healthier world/i);
  expect(heading).toBeInTheDocument();
});
