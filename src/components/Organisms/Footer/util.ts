import { MenuItem, FooterMenuData as FooterMenuDataInterface } from './FooterTypes';

export function generateMenuItems(
  menuKeys: string[],
  translations: any,
  isAuthenticated: boolean,
  footerMenuData: FooterMenuDataInterface
) {
  return menuKeys.map((menuKey) => {
    const { title, links } = footerMenuData.items[menuKey];
    const menuItems: MenuItem[] =
      links?.map(({ href, text, disabled }) => ({
        href,
        text: translations(text),
        disabled: disabled && !isAuthenticated
      })) || [];

    return {
      key: menuKey,
      title: translations(title),
      links: menuItems
    };
  });
}
