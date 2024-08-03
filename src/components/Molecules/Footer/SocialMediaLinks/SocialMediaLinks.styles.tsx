import styled from '@emotion/styled';

export const SocialLinksContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

export const SocialLinksWrapper = styled('div')({
  display: 'flex',
  gap: '1rem',
  marginTop: '10px'
});

export const SocialLink = styled('a')({
  '&:last-child': {
    marginRight: 0
  }
});

export const SocialIcon = styled('img')({
  verticalAlign: 'top',
  '&:hover': {
    filter:
      'invert(93%) sepia(46%) saturate(5431%) hue-rotate(339deg) brightness(97%) contrast(106%)'
  }
});
