import { render, fireEvent, screen } from '@testing-library/react';
import FaqItem from '@/components/Organisms/Faq/FaqItem';

describe('FaqItem', () => {
  it('renders without crashing', () => {
    const faq = { Title: 'Test Question', Text: 'Test Answer' };
    render(<FaqItem toggleDropdown={() => undefined} faq={faq} isVisible={false} />);
  });

  it('renders the correct question and answer', () => {
    const faq = { Title: 'Test Question', Text: 'Test Answer' };
    render(<FaqItem toggleDropdown={() => undefined} faq={faq} isVisible={false} />);
    expect(screen.getByText(faq.Title)).toBeInTheDocument();
    expect(screen.getByText(faq.Text)).toBeInTheDocument();
  });

  it('triggers toggleDropdown function when question is clicked', () => {
    const toggleDropdown = jest.fn();
    const faq = { Title: 'Test Question', Text: 'Test Answer' };
    render(<FaqItem toggleDropdown={toggleDropdown} faq={faq} isVisible={false} />);

    fireEvent.click(screen.getByText(faq.Title));
    expect(toggleDropdown).toHaveBeenCalledTimes(1);
  });
});
