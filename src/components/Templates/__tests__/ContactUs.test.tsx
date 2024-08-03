import { render, screen, fireEvent } from '@testing-library/react';
import ContactUsTem from '@/components/Templates/ContactUs';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';
import { useTranslations } from '@/hooks/useTranslations';

const mockTranslations = {
  contactUs: 'Contact Us',
  ifYouHaveRun:
    'If you have run into any issues or have any problems, please contact our wonderful support chat! They are available 24/7 and will be able to assist you.',
  liveChat: 'Live Chat',
  liveSupport: 'Live Support',
  haveAnyQuestions: 'Have any questions? Just drop us an email.',
  supportEmail: 'support@spinbet.com',
  complaintsEmail: 'complaints@spinbet.com',
  partnersEmail: 'partners@spinbet.com'
};

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;

jest.mock('@/hooks/useTranslations', () => ({
  ...jest.requireActual('@/hooks/useTranslations'),
  useTranslations: jest.fn()
}));

describe('ContactUsTem', () => {
  /* eslint-disable no-global-assign */
  let originalWindow: typeof window;
  let mockIntercom: jest.Mock;

  beforeEach(() => {
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
    window = originalWindow;
  });

  beforeEach(() => {
    mockUseTranslations.mockReturnValue({
      t: (key) => mockTranslations[key as keyof typeof mockTranslations],
      loading: false,
      error: false
    });
  });

  it('should render the component', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <ContactUsTem />
        </MockRouter>
      </RecoilRoot>
    );
    const contactUsElement = screen.getByRole('heading', { name: /contact us/i });
    expect(contactUsElement).toBeInTheDocument();
  });

  it('should render the paragraph', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <ContactUsTem />
        </MockRouter>
      </RecoilRoot>
    );
    const paragraphElement = screen.getByText(
      /if you have run into any issues or have any problems, please contact our wonderful support chat!/i
    );
    expect(paragraphElement).toBeInTheDocument();
  });

  it('should render the email links', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <ContactUsTem />
        </MockRouter>
      </RecoilRoot>
    );
    const supportEmail = screen.getByText(/support@spinbet.com/i);
    const complaintsEmail = screen.getByText(/complaints@spinbet.com/i);
    const partnersEmail = screen.getByText(/partners@spinbet.com/i);

    expect(supportEmail).toBeInTheDocument();
    expect(complaintsEmail).toBeInTheDocument();
    expect(partnersEmail).toBeInTheDocument();
  });

  it('should click on the live chat button', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <ContactUsTem />
        </MockRouter>
      </RecoilRoot>
    );

    const liveChatButton = screen.getByTestId('live-chat-button');

    fireEvent.click(liveChatButton);
    expect(mockIntercom).toHaveBeenCalledWith('show');
  });
});
