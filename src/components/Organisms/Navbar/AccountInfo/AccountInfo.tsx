import { DropDownIcon } from '@/components/Atoms/DropDown';
import { AccountInfoDiv, WalletAmount, WalletButton } from '../NavBarStyles';
import { useMediaQuery } from '@mui/material';
import { WalletIcon } from './WalletIcon';
import { WalletAmountDisplay } from './WalletAmountDisplay';
import AccountInfoDropdown from './AccountInfoDropdown';

type AccountInfoTypes = {
  isPlaying: boolean;
  isAuthenticated: boolean;
  filteredTransactions?: any;
  filteredData?: any;
  hasDeclineBonus?: boolean;
  isExtended: boolean;
  toggleExtended: () => void;
  handleWalletButtonClick: () => void;
};

export const AccountInfo = ({
  isPlaying,
  isAuthenticated,
  filteredData,
  isExtended,
  toggleExtended,
  handleWalletButtonClick
}: AccountInfoTypes) => {
  const is430MaxWidth = useMediaQuery('(max-width:430px)');

  return (
    <div>
      <AccountInfoDiv isAuthenticated={isAuthenticated}>
        <WalletAmount onClick={isPlaying ? undefined : toggleExtended}>
          <WalletAmountDisplay isPlaying={isPlaying} filteredData={filteredData} />
          {!isPlaying && <DropDownIcon isExpanded={isExtended} />}
        </WalletAmount>
        <WalletButton
          isSmallerScreen={is430MaxWidth}
          showIcon={is430MaxWidth}
          imageOnly={is430MaxWidth}
          handleClick={handleWalletButtonClick}
          isSvgPath={false}
          icon={<WalletIcon />}
        >
          Wallet
        </WalletButton>
      </AccountInfoDiv>

      <AccountInfoDropdown isExtended={isExtended} filteredData={filteredData} />
    </div>
  );
};
