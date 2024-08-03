import React from 'react';
import { render, screen } from '@testing-library/react';
import { AlertDialogs } from '../../Payment/AlertDialogs';

describe('AlertDialogs component', () => {
  test('renders a success dialog', () => {
    render(<AlertDialogs type="success" title="Title" />);
    const alertElement = screen.getByTestId('alert-dialog');
    expect(alertElement).toBeInTheDocument();
    const successIconElement = screen.getByTestId('success-icon');
    expect(successIconElement).toBeInTheDocument();
  });

  test('renders a warning dialog', () => {
    render(<AlertDialogs type="warning" title="Title" />);
    const alertElement = screen.getByTestId('alert-dialog');
    expect(alertElement).toBeInTheDocument();
    const warningIconElement = screen.getByTestId('warning-icon');
    expect(warningIconElement).toBeInTheDocument();
  });

  test('renders a error dialog with a button', () => {
    render(<AlertDialogs type="error" title="Title" />);
    const alertElement = screen.getByTestId('alert-dialog');
    expect(alertElement).toBeInTheDocument();
    const errorIconElement = screen.getByTestId('error-icon');
    expect(errorIconElement).toBeInTheDocument();
  });

  test('renders a warning dialog with a button', () => {
    render(<AlertDialogs type="warning" title="Title" buttonLabel="test" />);
    const alertElement = screen.getByTestId('alert-dialog');
    expect(alertElement).toBeInTheDocument();
    const formButton = screen.getByTestId('form-btn');
    expect(formButton).toBeInTheDocument();
  });
});
