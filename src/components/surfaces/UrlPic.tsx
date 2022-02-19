import React, {FC} from 'react';
import {ImageUtils} from '../../shared/utils/imageUtils';
import {Avatar, Image} from 'native-base';
import {ISizes} from 'native-base/lib/typescript/theme/base/sizes';

const img = require('../../../assets/images/fallback.jpg');

type UrlPicProps = {
  url: string;
  size: ISizes;
  border?: number;
  invertedBorder?: boolean;
};

const UrlPic: FC<UrlPicProps> = ({url, size, border = 0, invertedBorder}) => {
  const isBigImage = size === 'lg' || size === 'xl' || size === '2xl';

  const uri = isBigImage ? ImageUtils.getImage(url) : ImageUtils.getThumbnail(url);

  const borderColor = invertedBorder ? 'white' : 'tertiary.500';

  return (
    <Avatar source={{uri}} size={size} borderWidth={border} borderColor={borderColor} overflow="hidden">
      <Image source={img} width="100%" height="100%" alt="Fatodo fallback image" />
    </Avatar>
  );
};

export default UrlPic;
