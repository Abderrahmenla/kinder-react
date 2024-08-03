import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfirmationPopup, {
  ConfirmationPopupButtonProps,
  ConfirmationPopupProps
} from '../ConfirmationPopup/ConfirmationPopup';

const sampleButtons: ConfirmationPopupButtonProps[] = [
  {
    label: 'Cancel',
    callback: () => null,
    buttonVariant: 'Secondary'
  },
  {
    label: 'Confirm',
    callback: () => null,
    buttonVariant: 'Primary'
  }
];

const sampleProps: ConfirmationPopupProps = {
  type: 'warning',
  title: 'Are you sure?',
  subtitle: 'This action is irreversible.',
  buttons: sampleButtons
};

describe('Confimation Popup Compoennt', () => {
  it('should render a title', () => {
    render(<ConfirmationPopup {...sampleProps} />);

    const element = screen.getByText('Are you sure?');
    expect(element).toBeInTheDocument();
  });

  it('should render a subtitle', () => {
    render(<ConfirmationPopup {...sampleProps} />);

    const element = screen.getByText('This action is irreversible.');
    expect(element).toBeInTheDocument();
  });

  it('should render a warning image', () => {
    render(<ConfirmationPopup {...sampleProps} />);

    const image = screen.getByAltText('warning', { exact: false });
    expect(image).toBeInTheDocument();
  });

  it('should render two buttons', () => {
    render(<ConfirmationPopup {...sampleProps} />);

    const element = screen.getAllByRole('button');

    expect(element.length).toBe(2);
  });
});
