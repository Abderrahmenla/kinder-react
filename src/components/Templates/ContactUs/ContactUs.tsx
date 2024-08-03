import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';
import {
  ContactUsContainerMobile,
  ContactUsWrapper,
  HeadingMobile,
  ContactUsContainer,
  Heading,
  LinkContainer,
  LinksWrapper,
  LiveChatButton,
  LiveChatContainer,
  LiveChatIcon,
  Paragraph
} from './ContactUs.style';
import { Grid, useMediaQuery } from '@mui/material';

declare global {
  interface Window {
    Intercom: any;
  }
}

const ContactUsTem = () => {
  const { t } = useTranslations();
  const isMobile = useMediaQuery('(max-width:1023px)');

  return (
    <>
      {isMobile && (
        <ContactUsContainerMobile>
          <HeadingMobile size={'b2'} type={'Body'}>
            {t('contactUs')}
          </HeadingMobile>
        </ContactUsContainerMobile>
      )}
      <ContactUsWrapper>
        <ContactUsContainer container spacing={2}>
          <Grid item xs={12} style={{ padding: 0 }}>
            <Heading>{t('contactUs')}</Heading>
          </Grid>
          <Grid item xs={12} style={{ padding: 0 }}>
            <Paragraph>{t('ifYouHaveRun')}.</Paragraph>
          </Grid>
          <Grid item xs={12} style={{ padding: 0 }}>
            <LiveChatContainer onClick={() => window && window.Intercom('show')}>
              <LiveChatButton role="button" data-testid="live-chat-button">
                <LiveChatIcon src={`${assets}/images/support-icon-v2.svg`} />
                <span>{t('liveSupport')}</span>
              </LiveChatButton>
            </LiveChatContainer>
          </Grid>
          <Grid item xs={12} style={{ padding: 0 }}>
            <LinkContainer>
              <p>{t('haveAnyQuestions')}</p>
              <LinksWrapper>
                <a href="mailto:support@spinbet.com">support@spinbet.com</a>
                <a href="mailto:complaints@spinbet.com">complaints@spinbet.com</a>
                <a href="mailto:partners@spinbet.com">partners@spinbet.com</a>
              </LinksWrapper>
            </LinkContainer>
          </Grid>
        </ContactUsContainer>
      </ContactUsWrapper>
    </>
  );
};

export default ContactUsTem;
