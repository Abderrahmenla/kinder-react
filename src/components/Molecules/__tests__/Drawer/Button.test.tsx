/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from '@testing-library/react';
import Button from '../../Button';
// adjust this path to the actual path of your Button component

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button />);
  });

  it('displays the provided text when open', () => {
    const { getByText } = render(<Button open text="Click me!" />);
    expect(getByText('Click me!')).toBeInTheDocument();
  });

  it('does not display text when not open', () => {
    const { queryByText } = render(<Button text="Click me!" />);
    expect(queryByText('Click me!')).toBeNull();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick} />);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders the provided icon', () => {
    const icon = '/path/to/icon.png'; // replace with the actual path to an icon
    const { getByAltText } = render(<Button icon={icon} text="Icon button" />);
    expect(getByAltText('Icon button Icon')).toBeInTheDocument();
  });
});
