import { render, screen } from '@testing-library/react';
import BlogPost from '@/components/Organisms/Blog/BlogPost/BlogPost';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';

describe('BlogPost', () => {
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
          <BlogPost {...mockProps} />
        </MockRouter>
      </RecoilRoot>
    );
    const image = screen.getByTestId('blog-caption-img');
    expect(image).toBeDefined();
    expect(image).toHaveAttribute('src', mockProps.image);

    // Check if the title is rendered correctly
    const title = screen.getByText(mockProps.title);
    expect(title).toBeInTheDocument();

    // Check if the text is rendered correctly
    const text = screen.getByText(mockProps.text);
    expect(text).toBeInTheDocument();
  });
});
