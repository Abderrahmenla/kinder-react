import dynamic from 'next/dynamic';
import {
  ResponsibleGamblingContainer,
  ResponsibleGamblingSections
} from './ResponsibleGambling.styles';

const LimitSection = dynamic(() => import('./LimitSection/LimitSection'));
const LimitsTable = dynamic(() => import('./LimitsTable/LimitsTable'));
const SelfExclusion = dynamic(() => import('./SelfExclusion/SelfExclusion'));
const TakeABreak = dynamic(() => import('./TakeABreak/TakeABreak'));

const ResponsibleGambling = () => {
  return (
    <ResponsibleGamblingContainer>
      <LimitsTable />
      <ResponsibleGamblingSections>
        <TakeABreak />
        <LimitSection limitType="Deposit" />
        <LimitSection limitType="TotalLost" />
        <LimitSection limitType="TotalWager" />
        <SelfExclusion />
      </ResponsibleGamblingSections>
    </ResponsibleGamblingContainer>
  );
};

export default ResponsibleGambling;
