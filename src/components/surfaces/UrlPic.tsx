import React, {memo} from 'react';
import {ImageUtils} from '../../shared/utils/imageUtils';
import {Avatar, Image} from 'native-base';
import {ISizes} from 'native-base/lib/typescript/theme/base/sizes';

const img = require('../../../assets/images/fallback.jpg');

type UrlPicProps = {
  file: string;
  size: ISizes | number | string;
  border?: string | number;
  invertedBorder?: boolean;
};

const UrlPic = ({file, size, border = 0, invertedBorder}: UrlPicProps) => {
  const isBigImage = size === 'lg' || size === 'xl' || size === '2xl' || size > 60;
  const source = !file || ImageUtils.isUrl(file) ? file : ImageUtils.buildImageUri(file, !isBigImage);
  const borderColor = invertedBorder ? 'white' : 'tertiary.500';

  return (
    <Avatar source={{uri: source}} size={size} borderWidth={border} borderColor={borderColor} overflow="hidden">
      <Image source={img} width="100%" height="100%" alt="Fatodo fallback image" />
    </Avatar>
  );
};

export default memo(UrlPic);
