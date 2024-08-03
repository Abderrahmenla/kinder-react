import { render, fireEvent, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { DrawerComponent } from '@/components/Organisms/Drawer/Drawer';
import { GET_ALL_PROMOTIONS } from '@/graphql/queries/promotions';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: ''
    };
  }
}));
jest.mock('@/graphql/queries/promotions', () => ({
  GET_ALL_PROMOTIONS: jest.fn()
}));

jest.mock('swiper/modules', () => ({
  Pagination: jest.fn()
}));

describe('DrawerComponent', () => {
  /* eslint-disable no-global-assign */

  let originalWindow: typeof window;
  let mockIntercom: jest.Mock;

  beforeEach(() => {
    // Mock the GraphQL query response
    (GET_ALL_PROMOTIONS as unknown as jest.Mock).mockResolvedValue({
      data: {
        promotions: {
          data: [
            {
              id: '1',
              attributes: {
                PromotionName: 'Mock Promotion 1',
                Featured: true,
                ShortDescription: 'This is a mock promotion.',
                Icon: 'https://example.com/mock-banner.jpg',
                Banner: {
                  data: {
                    attributes: {
                      url: 'https://example.com/mock-banner.jpg'
                    }
                  }
                }
              }
            }
          ]
        }
      }
    });

    // Store the original window object
    originalWindow = { ...window };

    // Create a new mock function
    mockIntercom = jest.fn();

    // Delete the existing Intercom property if it exists
    delete (window as any).Intercom;

    // Define the new Intercom property on the window object
    Object.defineProperty(window, 'Intercom', {
      value: mockIntercom,
      configurable: true // This will allow the property to be deleted again later if needed
    });
  });

  afterEach(() => {
    // Restore the original window object after each test
    window = originalWindow;
  });

  const renderDrawerComponent = () =>
    render(
      <RecoilRoot>
        <DrawerComponent />
      </RecoilRoot>
    );

  it('renders without crashing', () => {
    renderDrawerComponent();
  });

  xtest('renders CasinoSport, Hamburger, and Drawer components', () => {
    render(
      <RecoilRoot>
        <DrawerComponent />
      </RecoilRoot>
    );

    const casinoSport = screen.getByTestId('CasinoSport');
    expect(casinoSport).toBeInTheDocument();

    const hamburger = screen.getByRole('button'); // Assuming Hamburger is a button
    expect(hamburger).toBeInTheDocument();

    const drawer = screen.getByTestId('Drawer');
    expect(drawer).toBeInTheDocument();
  });

  xtest('toggles drawer open state when Hamburger button is clicked', () => {
    render(
      <RecoilRoot>
        <DrawerComponent />
      </RecoilRoot>
    );

    const hamburgerButton = screen.getByRole('button');
    fireEvent.click(hamburgerButton);

    const drawer = screen.getByTestId('Drawer');
    expect(drawer).toHaveClass('MuiDrawer-root MuiDrawer-docked');
  });

  xtest('shows less content when closed', () => {
    render(
      <RecoilRoot>
        <DrawerComponent />
      </RecoilRoot>
    );

    const hamburgerButton = screen.getByRole('button');
    fireEvent.click(hamburgerButton);
    fireEvent.click(hamburgerButton);

    const loggedInStatsCard = screen.queryByTestId('LoggedInStatsCard');
    expect(loggedInStatsCard).toBeNull();
  });
});
