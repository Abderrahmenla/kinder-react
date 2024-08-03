import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Hamburger from '../../Drawer/Hamburger';

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn()
}));

describe('<Hamburger />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.getComputedStyle = jest.fn().mockImplementation(() => {
      return {
        getPropertyValue: (prop: unknown) => {
          switch (prop) {
            case 'left':
              return '64px';
            default:
              return '';
          }
        }
      };
    });
  });

  it('renders Hamburger component and checks interaction', () => {
    const mockFunc = jest.fn();
    const open = false;

    render(
      <RecoilRoot>
        <Hamburger onClick={mockFunc} open={open} />
      </RecoilRoot>
    );

    expect(screen.getByAltText('Hamburger icon')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('hamburger-container'));

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('renders Hamburger component with open drawer', () => {
    const mockFunc = jest.fn();
    const open = true;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    (require('recoil').useRecoilValue as jest.Mock).mockReturnValue(open);

    render(
      <RecoilRoot>
        <Hamburger onClick={mockFunc} open={open} />
      </RecoilRoot>
    );

    const image = screen.getByAltText('Hamburger icon') as HTMLImageElement;
    expect(image.src).toContain(`http://localhost/assets/images/drawer/hamburgerClose.svg`);
  });

  it('renders Hamburger component with closed drawer', () => {
    const mockFunc = jest.fn();
    const open = false;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    (require('recoil').useRecoilValue as jest.Mock).mockReturnValue(open);

    render(
      <RecoilRoot>
        <Hamburger onClick={mockFunc} open={open} />
      </RecoilRoot>
    );

    const image = screen.getByAltText('Hamburger icon') as HTMLImageElement;
    expect(image.src).toContain(`http://localhost/assets/images/drawer/hamburgerOpen.svg`);
  });

  it('checks hamburger component style when drawer is open', () => {
    const mockFunc = jest.fn();
    const open = true;

    window.getComputedStyle = jest.fn().mockImplementation(() => {
      return {
        getPropertyValue: (prop: unknown) => {
          switch (prop) {
            case 'left':
              return '245px';
            default:
              return '';
          }
        }
      };
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    (require('recoil').useRecoilValue as jest.Mock).mockReturnValue(open);

    render(
      <RecoilRoot>
        <Hamburger onClick={mockFunc} open={open} />
      </RecoilRoot>
    );

    const container = screen.getByTestId('hamburger-container');
    const styles = window.getComputedStyle(container);
    expect(styles.getPropertyValue('left')).toEqual('245px');
  });

  it('checks hamburger component style when drawer is closed', () => {
    const mockFunc = jest.fn();
    const open = false;

    window.getComputedStyle = jest.fn().mockImplementation(() => {
      return {
        getPropertyValue: (prop: unknown) => {
          switch (prop) {
            case 'left':
              return '64px';
            default:
              return '';
          }
        }
      };
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    (require('recoil').useRecoilValue as jest.Mock).mockReturnValue(open);

    render(
      <RecoilRoot>
        <Hamburger onClick={mockFunc} open={open} />
      </RecoilRoot>
    );

    const container = screen.getByTestId('hamburger-container');
    const styles = window.getComputedStyle(container);
    expect(styles.getPropertyValue('left')).toEqual('64px');
  });
});
