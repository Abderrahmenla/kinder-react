import React from 'react';
import { render as rtlRender, fireEvent, screen } from '@testing-library/react';
import FormDropDown from '@/components/Molecules/Auth/FormDropDown';

type FormDropDownProps = React.ComponentProps<typeof FormDropDown>;

function renderFormDropDown(props: FormDropDownProps) {
  return rtlRender(<FormDropDown {...props} />);
}

describe('FormDropDown', () => {
  const mockOnChange = jest.fn();

  const props = {
    label: 'Test Label',
    important: true,
    type: 'text',
    name: 'testName',
    value: 'EURO',
    data: ['EURO', 'USD', 'GBP'],
    onChange: mockOnChange
  };

  it('renders label correctly', () => {
    renderFormDropDown(props);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders dropdown values correctly', () => {
    renderFormDropDown(props);
    const dropdownButton = screen.getByRole('img');
    fireEvent.click(dropdownButton);

    expect(screen.getAllByText('EURO')).toHaveLength(2);
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('GBP')).toBeInTheDocument();
  });

  it('calls onChange handler with correct value when option is clicked', () => {
    renderFormDropDown(props);
    const dropdownButton = screen.getByRole('img');
    fireEvent.click(dropdownButton);

    const option = screen.getByText('USD');
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalledWith({ target: { value: 'USD', name: 'testName' } });
  });

  it('displays error message when provided', () => {
    const errorMsgProps = { ...props, errorMsg: 'Error occurred' };
    renderFormDropDown(errorMsgProps);
    expect(screen.getByRole('alert')).toHaveTextContent('Error occurred');
  });
});
