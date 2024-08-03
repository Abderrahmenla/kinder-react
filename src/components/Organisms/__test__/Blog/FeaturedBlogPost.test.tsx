import { render, screen } from '@testing-library/react';
import FeaturedBlogPost from '@/components/Organisms/Blog/FeaturedBlogPost/FeaturedBlogPost';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';

describe('FeaturedBlogPost', () => {
  const mockProps = {
    image: 'https://example.com/image.jpg',
    title: 'Test',
    text: 'Text',
    publishedAt: 'test time',
    Slug: 'slug'
  };

  it('renders correctly', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <FeaturedBlogPost {...mockProps} />
        </MockRouter>
      </RecoilRoot>
    );

    // Check if the title is rendered correctly
    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();

    // Check if the text is rendered correctly
    const textElement = screen.getByText(mockProps.text);
    expect(textElement).toBeInTheDocument();
  });
});
