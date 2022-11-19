import React, {memo} from 'react';
import {ImageUtils} from '../../shared/utils/ImageUtils';
import {Avatar, Image, useColorModeValue} from 'native-base';
import {ISizes} from 'native-base/lib/typescript/theme/base/sizes';
import FCenter from '../boxes/FCenter';
import {ColorScheme} from '../../shared/themes/ThemeFactory';

const img = require('../../../assets/images/logo-grayscale.png');

type UrlPicProps = {
  file: string;
  size: ISizes | number | string;
  colorScheme?: ColorScheme;
  border?: string | number;
  invertedBorder?: boolean;
};

const UrlPic = ({file, size, border = 0, invertedBorder, colorScheme}: UrlPicProps) => {
  const isBigImage = size === 'lg' || size === 'xl' || size === '2xl' || size > 60;
  const source = !file || ImageUtils.isUrl(file) ? file : ImageUtils.buildImageUri(file, !isBigImage);
  const borderColor = invertedBorder ? 'white' : `${colorScheme || 'primary'}.500`;

  const bg = useColorModeValue('white', 'gray.700');

  return (
    <Avatar bg={bg} source={{uri: source}} size={size} borderWidth={border} borderColor={borderColor} overflow="hidden">
      <FCenter w="100%" h="100%" justifyContent="center" alignItems="center">
        <Image source={img} width="75%" height="75%" bg={bg} alt="Fatodo fallback image" />
      </FCenter>
    </Avatar>
  );
};

export default memo(UrlPic);
