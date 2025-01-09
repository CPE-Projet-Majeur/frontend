import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Signup } from '../pages/Signup';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('SignupForm', () => {
  it('renders the form fields', () => {
    render(<Provider store={store}><MemoryRouter><Signup /></MemoryRouter></Provider>);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/surname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  // it('shows an error when password is too short', () => {
  //   render(<Provider store={store}><MemoryRouter><Signup /></MemoryRouter></Provider>);

  //   const passwordInput = screen.getByPlaceholderText('Password');
  //   const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
  //   const submitButton = screen.getByRole('button', { name: 'Submit' });

  //   fireEvent.change(passwordInput, { target: { value: '123' } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
  //   fireEvent.click(submitButton);

  //   expect(screen.getByText('The password must be at least 8 characters long.')).toBeInTheDocument();
  // });

  // it('shows an error when passwords do not match', () => {
  //   render(<Provider store={store}><MemoryRouter><Signup /></MemoryRouter></Provider>);

  //   const passwordInput = screen.getByPlaceholderText('Password');
  //   const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
  //   const submitButton = screen.getByRole('button', { name: 'Submit' });

  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: 'different123' } });
  //   fireEvent.click(submitButton);

  //   expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  // });

  // it('submits successfully when passwords match and are valid', () => {
  //   render(<Provider store={store}><MemoryRouter><Signup /></MemoryRouter></Provider>);

  //   const passwordInput = screen.getByPlaceholderText('Password');
  //   const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
  //   const submitButton = screen.getByRole('button', { name: 'Submit' });

  //   fireEvent.change(passwordInput, { target: { value: 'password123!' } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: 'password123!' } });
  //   fireEvent.click(submitButton);

  //   expect(screen.queryByText('The password must be at least 8 characters long.')).toBeNull();
  //   expect(screen.queryByText('Passwords do not match.')).toBeNull();
  // });
});
