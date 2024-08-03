import { BonusCard } from '@/components/Molecules/Payment/BonusCard';
import { Hint } from '@/components/Atoms';
import FormGroup from '@/components/Molecules/Auth/FormGroup';
import { ArrowIcon } from '@/components/Atoms/ArrowIcon';
import { SuffixContainer } from '@/components/Molecules/Payment/BonusStyle';
import { BonusDarkButton } from '@/components/Molecules/Payment/BonusDarkButton';
import { Link } from '@/components/Molecules/Payment/Link';

export const Bonus = () => {
  return (
    <div data-testid="bonus-main-container">
      <Hint centered>SASINO BONUS</Hint>
      <BonusCard title="Some Long Bonus Name  + 100% bonus up to $1200" icon="first" />
      <Hint centered>SPORTSBOOK BONUS</Hint>
      <BonusCard title="Some Long Bonus Name  + 100% bonus up to $1200" icon="second" />

      <BonusCard ghost>
        <Hint centered>Have a Promocode?</Hint>
        <FormGroup
          placeholder="Type it here"
          type="text"
          name="promoCode"
          suffix={
            <SuffixContainer>
              <ArrowIcon />
            </SuffixContainer>
          }
        />
      </BonusCard>

      <BonusDarkButton>NO THANX, NO NEED FOR BONUS</BonusDarkButton>

      <Link href="/">Show more information about our Bonus Program...</Link>
    </div>
  );
};
