import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { ReferralLayout } from '../../Referral/ReferralLayout';

describe('ReferralLayout component', () => {
  it('renders the ReferralLayout overview section', async () => {
    render(
      <RecoilRoot>
        <ReferralLayout
          setUserClipBoard={(uC) => uC}
          claimRewards={() => null}
          slug={''}
          successMessage={''}
          referralInfo={''}
        />
      </RecoilRoot>
    );
  });
});
