import dynamic from 'next/dynamic';
import {
  SectionButton,
  SectionHeader,
  SectionDescription,
  SectionButtonText
} from '@/components/Organisms/Settings/ResponsibleGambling/ResponsibleGambling.styles';
import { useTranslations } from '@/hooks/useTranslations';
import { SelfExclusionContainer, SelfExclusionHeader } from './SelfExclusion.styles';

const ContactUsIcon = dynamic(() => import('@/components/Atoms/Icons/ContactUsIcon'));

const SelfExclusion = () => {
  const { t } = useTranslations();

  return (
    <SelfExclusionContainer>
      <SelfExclusionHeader>
        <SectionHeader size="b2" color="var(--darker-white)">
          {t('selfExclusion')}
        </SectionHeader>

        <SectionDescription size="b2" color="var(--soft-blue-100)">
          {t('selfExclusionCaption')}
        </SectionDescription>
      </SelfExclusionHeader>

      <SectionButton handleClick={() => window && window.Intercom('show')} icon={<ContactUsIcon />}>
        <SectionButtonText size="b2" color="var(--very-dark-violet)">
          {t('contactUs')}
        </SectionButtonText>
      </SectionButton>
    </SelfExclusionContainer>
  );
};

export default SelfExclusion;
