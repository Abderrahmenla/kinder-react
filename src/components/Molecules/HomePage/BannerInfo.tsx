import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { BannerButton } from './BannerButton';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';
import { openToggleAuthState } from '@/components/state/openToggleAuthState';
import { useSetRecoilState } from 'recoil';
import { openAuthPageState } from '@/components/state/openAuthPageState';
interface BannerInfoProps {
  headerText: string;
  subHeaderText?: string;
  description: string;
  bannerButton: {
    ctaName: string;
    ctaValue: string;
    ctaType: string;
  };
}

const BannerInfoContainer = styled('div')({
  width: '370px',
  position: 'absolute',
  top: '44px',
  left: '60px',
  zIndex: 1,
  height: 'calc(100% - 55px)',
  ' @media screen and (max-width:1300px)': {
    width: '290px',
    top: '44px',
    left: '58px',
    height: 'calc(100% - 45px)'
  },
  '@media screen and (max-width:1100px)': {
    height: 'calc(100% - 32px)',
    top: '44px',
    left: '58px'
  },
  '@media screen and (max-width:900px)': {
    height: 'calc(100% - 32px)',
    width: '260px',
    top: '44px',
    left: '40px'
  },
  '@media screen and (max-width:479px)': {
    width: '245px',
    height: '100%',
    top: '11px',
    left: '18px'
  },
  '@media screen and (max-width:400px)': {
    width: '100%'
  }
});

const BannerInfoHeading = styled('h2')({
  fontWeight: 700,
  fontSize: '40px',
  lineHeight: '40px',
  textTransform: 'uppercase',
  color: 'white',
  margin: 0,
  '& span': {
    color: 'var(--vivid-pink)',
    fontWeight: 700
  },
  '@media screen and (max-width:1300px)': {
    fontSize: '32px',
    lineHeight: '33px'
  },
  '@media screen and (max-width:900px)': {
    fontSize: '26px',
    lineHeight: '28px'
  },
  '@media screen and (max-width:479px)': {
    fontSize: '24px',
    lineHeight: '26px'
  },
  '@media screen and (max-width:400px)': {
    fontSize: '20px',
    lineHeight: '22px',
    width: '186px'
  }
});

const SlideText = styled('div')({
  margin: '15px 0 25px 0',
  width: '90%',
  '& p': {
    margin: 0,
    fontWeight: 400,
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-19)',
    color: 'var(--soft-blue)',
    '@media screen and (max-width:1300px)': {
      fontSize: 'var(--font-size-13)',
      lineHeight: 'var(--l-height-18)'
    },
    '@media screen and (max-width:900px)': {
      fontSize: 'var(--font-size-12)',
      lineHeight: 'var(--l-height-16)'
    },
    '@media screen and (max-width:650px)': {
      lineHeight: 'var(--l-height-14)'
    }
  },
  '@media screen and (max-width:1300px)': {
    width: '100%'
  },
  '@media screen and (max-width:900px)': {
    margin: '10px 0 15px 0'
  },
  '@media screen and (max-width:650px)': {
    paddingRight: '50px'
  },
  '@media screen and (max-width:479px)': {
    display: 'none'
  }
});

const BtnRow = styled('div')({
  position: 'absolute',
  bottom: '30px',
  '@media screen and (max-width:1300px)': {
    bottom: '45px'
  },
  '@media screen and (max-width:1100px)': {
    bottom: '32px'
  },

  '@media screen and (max-width:479px)': {
    marginTop: '15px',
    width: '100%'
  }
});

export const BannerInfo: React.FC<BannerInfoProps> = ({
  headerText,
  description,
  bannerButton
}) => {
  const currentURL = window.location.href;
  const shouldShowBtnRow = currentURL.includes('en-nz');
  const router = useRouter();
  const setToggleAuthState = useSetRecoilState(openToggleAuthState);
  const setOpenAuthState = useSetRecoilState(openAuthPageState);

  const onClickBannerButton = useCallback(() => {
    if (bannerButton.ctaType === 'URL' || bannerButton.ctaType === 'Link') {
      router.push(bannerButton.ctaValue);
    } else {
      if (bannerButton.ctaValue === 'login') {
        setToggleAuthState({ toggle: 'signin' });
        setOpenAuthState({ open: true });
      }
    }
  }, [router, bannerButton, setOpenAuthState, setToggleAuthState]);

  return (
    <BannerInfoContainer>
      <BannerInfoHeading data-testid="header">
        <>{ReactHtmlParser(headerText)}</>
      </BannerInfoHeading>
      <SlideText>
        <p data-testid="description">{description}</p>
      </SlideText>
      {/* Temproary until new banner design for CA */}
      {shouldShowBtnRow && (
        <BtnRow>
          <BannerButton
            text={bannerButton.ctaName}
            dataTestId="bet-button"
            onClick={onClickBannerButton}
          />
        </BtnRow>
      )}
    </BannerInfoContainer>
  );
};
