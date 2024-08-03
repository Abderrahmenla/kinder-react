import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Container } from '@/components/Atoms';
import { SeoPagesProps } from 'src/graphql/types/seo';
import { useTranslations } from '@/hooks/useTranslations';
import Button from '../Atoms/Button/Button';

interface SeoWrapperProps {
  lessInfo: boolean;
}

interface ShowMoreButtonProps {
  lessInfo: boolean;
}

interface SeoContentProps {
  seo: SeoPagesProps;
  gamePage?: boolean;
}

const SeoText = styled('div')({
  fontFamily: 'Inter',
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    lineHeight: '1',
    marginBottom: '11px',
    fontSize: 'inherit'
  },
  '& h1 span, & h2 span, & h3 span, & h4 span, & h5 span, & h6 span': {
    color: 'var(--darker-white)',
    fontSize: 'var(--font-size-16) !important',
    fontFamily: 'inherit !important',
    fontWeight: '600 !important'
  },
  '& h2, & h3, & h4, & h5, & h6': {
    marginTop: '16px'
  },
  '& ul, & ol': {
    color: 'var(--grey-lower)',
    fontWeight: 400,
    fontSize: 'var(--font-size-14)',
    lineHeight: 'normal',
    paddingLeft: '20px'
  },
  '& p': {
    fontWeight: 400,
    fontSize: 'var(--font-size-14)',
    lineHeight: 'normal',
    color: 'var(--grey-lower)',
    '& a': {
      color: 'var(--pure-blue)'
    }
  },
  '& p span': {
    fontFamily: 'inherit !important'
  },
  '& p:first-of-type': {
    marginTop: '0'
  },
  '@media screen and (max-width:1100px)': {
    columnGap: '30px'
  },
  '@media screen and (max-width:768px)': {
    columnCount: 'unset'
  },
  marginBottom: '16px'
});

const ShowMoreButtonWrapper = styled('div')({
  display: 'flex',
  '@media screen and (max-width:479px)': {
    width: '100%'
  }
});

const ShowMoreButton = styled(Button)<ShowMoreButtonProps>(({ lessInfo }) => ({
  fontWeight: 500,
  fontSize: 'var(--font-size-14)',
  color: 'var(--soft-blue-100)',
  borderRadius: '6px',
  border: '1px solid var(--soft-blue-100)',
  padding: '8px 12px',
  position: lessInfo ? 'relative' : 'absolute',
  zIndex: lessInfo ? 0 : 1,
  bottom: lessInfo ? 0 : '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'inherit',
  '@media screen and (max-width:479px)': {
    width: lessInfo ? 'inherit' : 'calc(100% - 32px)'
  }
}));

const SeoWrapper = styled('div')<SeoWrapperProps>(({ lessInfo }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'var(--very-dark-violet-100)',
  borderRadius: '15px',
  padding: '24px',
  overflow: 'hidden',
  transition: 'max-height 0.5s linear',
  maxHeight: lessInfo ? 'initial' : '358px',
  position: 'relative',

  '&:before': {
    content: !lessInfo ? '""' : 'none',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
    background:
      'linear-gradient(180deg, rgba(25, 15, 51, 0) 0%, var(--very-dark-violet-100) 76.56%)'
  },

  '@media screen and (max-width:768px)': {
    padding: '16px'
  },
  '@media screen and (max-width:479px)': {
    maxHeight: lessInfo ? 'initial' : '686px'
  }
}));

const CustomContainer = styled(Container)({
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%'
});

const Row = styled('div')<{ gamePage?: boolean }>(({ gamePage }) => ({
  width: '100%',
  marginTop: '80px',
  '@media(max-width: 1300px)': {
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  '@media(max-width: 991px)': {
    margin: gamePage ? '20px 0' : 'initial'
  }
}));

export const SeoContent: React.FC<SeoContentProps> = ({ seo, gamePage = false }) => {
  const { t } = useTranslations();
  const [lessInfo, setLessInfo] = useState(false);
  const toggleLessInfo = () => {
    setLessInfo(!lessInfo);
  };

  return (
    <Grid className={'seo-content'} item xs={12}>
      <Row gamePage={gamePage}>
        <CustomContainer>
          <SeoWrapper lessInfo={lessInfo}>
            <SeoText>{ReactHtmlParser(seo?.SeoText as string) as React.ReactNode}</SeoText>
            <ShowMoreButtonWrapper>
              <ShowMoreButton
                variant={'Secondary'}
                lessInfo={lessInfo}
                handleClick={() => toggleLessInfo()}
              >
                {lessInfo ? `${t('showLessInfo')}` : `${t('showAllInfo')}...`}
              </ShowMoreButton>
            </ShowMoreButtonWrapper>
          </SeoWrapper>
        </CustomContainer>
      </Row>
    </Grid>
  );
};
