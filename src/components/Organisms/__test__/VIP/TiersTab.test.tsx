import { render, screen } from '@testing-library/react';
import TiersTab from '../../VIP/TiersTab';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';

describe('TiersTab component', () => {
  it('should render TiersTab correctly', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <TiersTab
            activeAwards={[]}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setAward={(_: string) => () => {}}
          />
        </MockRouter>
      </RecoilRoot>
    );
    const vipPackages = screen.getByTestId('vip-packages');
    expect(vipPackages).toBeInTheDocument();
  });

  it('should render images correctly', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <TiersTab
            activeAwards={[]}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setAward={(_: string) => () => {}}
          />
        </MockRouter>
      </RecoilRoot>
    );
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
