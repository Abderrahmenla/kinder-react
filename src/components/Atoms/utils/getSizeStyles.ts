export interface DropdownContainerProps {
  size?: 'XL' | 'L' | 'M' | 'S';
}

// A function to return the styles based on the size prop
export const getSizeStylesDropdown = (size?: DropdownContainerProps['size']) => {
  switch (size) {
    case 'XL':
      return `
          padding: 8px 14px;
          height: 48px;
        `;
    case 'L':
      return `
          padding: 8px 12px;
          height: 44px;
        `;
    case 'M':
      return `
          padding: 8px 10px;
          height: 40px;
        `;
    case 'S':
      return `
          padding: 8px;
          height: 36px;
        `;
    default:
      return '';
  }
};

export const getSizeStylesDropdownList = (size?: DropdownContainerProps['size']) => {
  switch (size) {
    case 'XL':
      return `
          padding: 8px 14px;
        `;
    case 'L':
      return `
          padding: 8px 12px;
        `;
    case 'M':
      return `
          padding: 8px 10px;
        `;
    case 'S':
      return `
          padding: 8px;

        `;
    default:
      return '';
  }
};
