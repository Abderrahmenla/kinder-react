import { styled } from '@mui/material/styles';

const Video = styled('video')({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0px',
  left: '0px',
  display: 'block',
  '@media screen and (max-width:479px)': {
    objectPosition: '71% 0%'
  }
});

const SwiperBackgroundImage = styled('div')(({ src }: { src: string }) => ({
  backgroundImage: `url(${src})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100%',
  height: '100%',
  minHeight: '1px'
}));

const FallbackBackgroundImage = styled('div')({
  backgroundColor: '#1D1466',
  width: '100%',
  height: '100%'
});

export const SwiperSlideComponent = ({ src }: { src: string }) => {
  const backgroundValue = (bannerBackground: string) => {
    const backgroundExtension = bannerBackground?.split('.').pop()?.toLowerCase();
    if (
      backgroundExtension === 'mp4' ||
      backgroundExtension === 'avi' ||
      backgroundExtension === 'mov'
    ) {
      return true;
    } else return false;
  };

  return (
    <>
      {src ? (
        backgroundValue(src) ? (
          <Video muted playsInline data-testid="video-element">
            <source src={src} type="video/mp4" data-testid="source-element" />
          </Video>
        ) : (
          <SwiperBackgroundImage src={src} />
        )
      ) : (
        <FallbackBackgroundImage />
      )}
    </>
  );
};
