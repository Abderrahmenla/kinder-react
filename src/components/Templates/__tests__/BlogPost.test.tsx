import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import BlogPage from '../Blog/BlogPage/BlogPage';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Helvetica'
  },
  breakpoints: {
    values: {
      xs: 0, // extra-small devices (portrait phones, less than 600px)
      sm: 600, // small devices (landscape phones, 600px and up)
      md: 768, // medium devices (tablets, 768px and up)
      lg: 992, // large devices (desktops, 992px and up)
      xl: 1200 // extra-large devices (large desktops, 1200px and up)
    }
  }
});

describe('BlogPage component', () => {
  const mockBlogs = [
    {
      id: '1',
      seo: '',
      attributes: {
        Image: {
          data: {
            id: '2',
            attributes: {
              width: 'test',
              height: 'test',
              url: 'test'
            }
          }
        },
        Title: 'New Games on Spinbet: May 10th Casino Releases',
        Text: 'Lorem ipsum dolor sit amet',
        publishedAt: '2023-05-10',
        Slug: 'new-games-on-spinbet-may-10th-casino-releases'
      }
    }
  ];

  it('renders page heading correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <MockRouter>
            <BlogPage blogs={mockBlogs} />
          </MockRouter>
        </RecoilRoot>
      </ThemeProvider>
    );
    const heading = screen.getByRole('heading', { name: /SpinBlog/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders FeaturedBlogPost component correctly when viewport is larger than xs', () => {
    render(
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <MockRouter>
            <BlogPage blogs={mockBlogs} />
          </MockRouter>
        </RecoilRoot>
      </ThemeProvider>
    );
    const featuredPostTitles = screen.getAllByText(
      'New Games on Spinbet: May 10th Casino Releases'
    );
    expect(featuredPostTitles).toHaveLength(1);
  });

  it('renders BlogPost components correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <MockRouter>
            <BlogPage blogs={mockBlogs} />
          </MockRouter>
        </RecoilRoot>
      </ThemeProvider>
    );
    const blogPostTitles = screen.getAllByText('New Games on Spinbet: May 10th Casino Releases');
    expect(blogPostTitles.length).toEqual(1);
  });
});
