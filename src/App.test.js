import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {

  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('Add New')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('adds a new timer', () => {
    render(<App />);
    window.prompt = jest.fn().mockImplementation(() => "30");
    fireEvent.click(screen.getByText('Add New'));
    expect(screen.getByText('00:30')).toBeInTheDocument();
  });

  test('starts and pauses timers', async () => {
    render(<App />);

    window.prompt = jest.fn().mockImplementation(() => "60");
    fireEvent.click(screen.getByText('Add New'));

    fireEvent.click(screen.getByText('Start'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    });
    fireEvent.click(screen.getByText('Pause'));

    const pauseResumeButton = screen.getByRole('button', { name: /resume/i });
    expect(pauseResumeButton).toBeInTheDocument();
    expect(pauseResumeButton).toHaveTextContent('Resume');
  });

});
