// Dropdown.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  DropDown,
  DropDownProps,
  IconContainer,
  IconLabel,
  Icon
} from '@/components/Atoms/DropDown';
import { Crypto } from '@/components/state/payment/cryptoState';
const meta: Meta = {
  title: 'Dropdown',
  component: DropDown,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDropdown: Story = (args: DropDownProps) => {
  const [label, setLabel] = useState('Cardano');
  return (
    <DropDown
      {...args}
      label={label}
      handleItemClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>, item) => {
        e.preventDefault();
        setLabel(item?.name);
      }}
      style={{
        width: '300px'
      }}
      styleDropdown={{
        borderRadius: '6px 6px 0px 0px'
      }}
      styleDropdownList={{
        maxHeight: '241px',
        width: '300px',
        backgroundColor: '#211442',
        overflow: 'hidden'
      }}
      styleDropdownListItemStyle={() => ({
        alignItems: 'center',
        paddingLeft: '40px',
        marginBottom: '8px',
        display: 'flex'
      })}
      polygonLogoLeft="22px"
      renderContent={(item: Crypto) => (
        <IconContainer>
          {item.icon && <Icon src={item.icon} rounded />}
          <IconLabel>{item.code}</IconLabel>
        </IconContainer>
      )}
    />
  );
};
DefaultDropdown.args = {
  style: { marginBottom: '220px' },
  dropdownItems: [
    {
      code: 'ADA',
      depositFee: 0,
      fiat: false,
      icon: 'https://media.dev.node.limited/8e710fe5-7409-447d-962e-c07158424d95.png',
      id: 2103,
      name: 'Cardano',
      options: {
        transaction: null,
        confirmations: 0,
        explorer: null,
        address: null
      },
      pricePrecision: 5,
      protocols: [
        {
          code: 'ADA',
          network: 'Cardano'
        }
      ],
      quantityPrecision: 8,
      supportsDeposits: true,
      supportsWithdrawals: true,
      withdrawalFee: 0,
      withdrawalParameters: []
    },
    {
      code: 'Btc',
      depositFee: 0,
      fiat: false,
      icon: 'https://media.dev.node.limited/8e710fe5-7409-447d-962e-c07158424d95.png',
      iconRounded: true,
      id: 2103,
      name: 'Bitcoin',
      options: {
        transaction: null,
        confirmations: 0,
        explorer: null,
        address: null
      },
      pricePrecision: 5,
      protocols: [
        {
          code: 'ADA',
          network: 'Cardano'
        }
      ],
      quantityPrecision: 8,
      supportsDeposits: true,
      supportsWithdrawals: true,
      withdrawalFee: 0,
      withdrawalParameters: []
    }
  ],
  icon: 'https://media.dev.node.limited/8e710fe5-7409-447d-962e-c07158424d95.png',

  size: 'M'
};
