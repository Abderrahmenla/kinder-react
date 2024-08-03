import { VerticalAssetProps } from '@/components/Templates/Home/Homepage.type';
import React from 'react';
import { VerticalAssetsContainer } from './VerticalAssets.style';
import { GameCardSection } from '../GameCardSection';
import { assets as assetPath } from '@/config/assets';

const VerticalAssets: React.FC<{ assets: VerticalAssetProps[] }> = ({ assets }) => {
  const getCard = (item: VerticalAssetProps, id: number) => {
    let icon = 'menuOne.svg';
    if (item.Text.toLocaleLowerCase() === 'sports') {
      icon = 'menuTwo.svg';
    }
    return (
      <React.Fragment key={`vertical-assets-${id}`}>
        <GameCardSection
          imageSrc={item.Image.data.attributes.url}
          iconSrc={`${assetPath}/images/${icon}`}
          text={item.Text}
          href={item.Link}
        />
      </React.Fragment>
    );
  };
  return (
    <VerticalAssetsContainer>
      {assets && assets.map((item, index) => getCard(item, index))}
    </VerticalAssetsContainer>
  );
};

const MemoizedVerticalAssets = React.memo(VerticalAssets);

export default MemoizedVerticalAssets;
