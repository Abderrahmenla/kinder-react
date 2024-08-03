import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu from '../../Drawer/Menu';
import { RecoilRoot } from 'recoil';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/'
  }))
}));

describe('Menu component', () => {
  const dummyProps = {
    isDrawerOpen: true,
    effectsEnabled: true,
    icon: '/path/to/icon',
    text: 'Menu Item',
    item: {
      title: 'Menu Item',
      url: '/',
      icon: '/path/to/item-icon',
      background: '/path/to/item-background',
      subItems: [
        { title: 'Sub Item 0', icon: '/path/to/sub-icon', url: '/sub-0' },
        { title: 'Sub Item 1', icon: '/path/to/sub-icon', url: '/sub-1' }
      ]
    }
  };

  it('renders menu container', async () => {
    render(
      <RecoilRoot>
        <Menu {...dummyProps} />
      </RecoilRoot>
    );
    const menuContainer = await screen.findByTestId('menu-container');
    expect(menuContainer).toBeInTheDocument();
  });

  it('renders submenu items when clicked', async () => {
    render(
      <RecoilRoot>
        <Menu {...dummyProps} />
      </RecoilRoot>
    );
    if (dummyProps.item?.subItems) {
      dummyProps.item.subItems.forEach(async (subItem, subItemIndex) => {
        const submenuItem = await screen.findByTestId(`submenu-item-${subItemIndex}`);
        if (submenuItem) {
          fireEvent.click(submenuItem);
          expect(await screen.findByText(subItem.title)).toBeInTheDocument();
        }
      });
    }
  });
});
