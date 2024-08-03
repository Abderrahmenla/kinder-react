import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { Container } from '../Container';

describe('Container', () => {
  test('renders a div with children', () => {
    render(<Container>Some content</Container>);
    const container = screen.getByText(/Some content/i);
    expect(container).toBeInTheDocument();
  });

  test('applies className to the container', () => {
    const testClassName = 'test-class';
    render(<Container className={testClassName}>Some content</Container>);
    const container = screen.getByText(/Some content/i);
    expect(container).toHaveClass(testClassName);
  });

  test('handles container click event', () => {
    const handleClick = jest.fn();
    render(
      <Container onClick={handleClick}>
        <p>Some content</p>
      </Container>
    );
    const container = screen.getByText(/Some content/i);
    fireEvent.click(container);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
