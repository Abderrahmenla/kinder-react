import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { TIME_RANGE_LOCAL } from '@/components/Organisms/Settings/ResponsibleGambling/ResponsibleGambling.constants';
import {
  SectionDescription,
  SectionHeader,
  SectionButton,
  SectionButtonText
} from '@/components/Organisms/Settings/ResponsibleGambling/ResponsibleGambling.styles';
import { useTranslations } from '@/hooks/useTranslations';
import { playerState } from '@/state/playerState';
import {
  LimitSectionContainer,
  LimitRanges,
  LimitInput,
  LimitInputField,
  LimitInputCurrency,
  LimitSectionHeader
} from './Limit.styles';
import { LimitComponentProps } from './Limit.type';

const LimitRange = dynamic(() => import('../Range/Range'));

const LimitComponent = ({
  heading,
  description,
  activeRange,
  setActiveRange,
  handleOnSave,
  handleChange,
  isLoading: loadingBtn,
  value
}: LimitComponentProps) => {
  const player = useRecoilValue(playerState);
  const { t } = useTranslations();
  const handleRangeClick = (range: string) => setActiveRange(range);
  const isDisabled = !value || Number(value) === 0;

  return (
    <LimitSectionContainer>
      <LimitSectionHeader>
        <SectionHeader size="b2" color="var(--darker-white)">
          {heading}
        </SectionHeader>
        <SectionDescription size="b2" color="var(--soft-blue-100)">
          {description}
        </SectionDescription>
      </LimitSectionHeader>

      <LimitRanges>
        {Object.values(TIME_RANGE_LOCAL).map((range) => (
          <LimitRange
            key={range}
            name={t(range)}
            onClick={() => handleRangeClick(range)}
            isActive={activeRange === range}
          />
        ))}
      </LimitRanges>

      <LimitInput>
        <LimitInputField
          size="md"
          type="number"
          name="lm-amount-loss"
          id="lm-amount-loss"
          placeholder="0.00"
          onChange={handleChange}
          value={value ?? ''}
          min={0}
        />
        <LimitInputCurrency size="b2" color="var(--darker-white)">
          {player?.currencyCode}
        </LimitInputCurrency>
      </LimitInput>

      <SectionButton handleClick={handleOnSave} disabled={isDisabled}>
        <SectionButtonText size="b2" color="var(--very-dark-violet)">
          {loadingBtn ? t('processing') : t('set')}
        </SectionButtonText>
      </SectionButton>
    </LimitSectionContainer>
  );
};

export default LimitComponent;
