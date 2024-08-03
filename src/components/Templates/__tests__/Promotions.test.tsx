import { render, fireEvent, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import PromotionsModal from '../Promotions/PromotionsModal';
import { useFilteredPromotions, Promotion } from '@/hooks/useFilteredPromotions';

jest.mock('@/hooks/useFilteredPromotions', () => ({
  useFilteredPromotions: jest.fn()
}));

jest.mock('@/components/state/openPromotionsState', () => {
  const setOpenPromotionsStateMock = jest.fn();
  return {
    ...jest.requireActual('@/components/state/openPromotionsState'),
    setOpenPromotionsState: setOpenPromotionsStateMock
  };
});

describe('PromotionsModal', () => {
  const mockPromotions: Promotion[] = [
    {
      id: 1,
      attributes: {
        Banner: {
          data: {
            attributes: {
              url: 'banner-url-1'
            }
          }
        },
        ShortDescription: 'Short description 1',
        PromotionName: 'Promotion name 1',
        ExpiryDate: '2022-01-01',
        Slug: 'promotion-slug-1',
        Icon: 'icon-url'
      }
    }
  ];
  beforeEach(() => {
    jest.clearAllMocks();
    (useFilteredPromotions as jest.Mock).mockReturnValue(Promise.resolve(mockPromotions));
  });
  xtest('should render without errors', () => {
    render(
      <RecoilRoot>
        <PromotionsModal open={true} setOpenPromotions={setOpenPromotionsStateMock} />
      </RecoilRoot>
    );
  });

  xtest('should display the promotion name', () => {
    render(
      <RecoilRoot>
        <PromotionsModal open={true} setOpenPromotions={setOpenPromotionsStateMock} />
      </RecoilRoot>
    );
    const promotionNameElement = screen.getByText('Test Promotion');
    expect(promotionNameElement).toBeInTheDocument();
  });

  xtest('should display the expiry date', () => {
    render(
      <RecoilRoot>
        <PromotionsModal open={true} setOpenPromotions={setOpenPromotionsStateMock} />
      </RecoilRoot>
    );
    const expiryDateElement = screen.getByText('Expires on: 2024-02-29');
    expect(expiryDateElement).toBeInTheDocument();
  });

  xtest('should display the short description', () => {
    render(
      <RecoilRoot>
        <PromotionsModal open={true} setOpenPromotions={setOpenPromotionsStateMock} />
      </RecoilRoot>
    );
    const shortDescriptionElement = screen.getByText('Test Short Description');
    expect(shortDescriptionElement).toBeInTheDocument();
  });

  xtest('should trigger the setOpenPromotions function when the modal is closed', () => {
    const setOpenPromotionsMock = jest.fn();
    render(
      <RecoilRoot>
        <PromotionsModal open={true} setOpenPromotions={setOpenPromotionsMock} />
      </RecoilRoot>
    );
    // Simulate closing the modal (e.g., clicking a close button)
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(setOpenPromotionsMock).toHaveBeenCalled();
  });
});
function setOpenPromotionsStateMock(): void {
  throw new Error('Function not implemented.');
}
