import React, {FC} from 'react';
import {Image} from '../../../models/Image';
import UrlPic from '../../surfaces/UrlPic';

type ImageUploadPreviewProps = {
  image: Image;
};

const ImageUploadPreview: FC<ImageUploadPreviewProps> = ({image}) => {
  return image?.filename ? <UrlPic url={image.filename} size="xl" border={3} /> : null;
};

export default ImageUploadPreview;