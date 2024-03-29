import React from 'react';
import {Image} from '../../../models/Image';
import UrlPic from '../../surfaces/UrlPic';

type ImageUploadPreviewProps = {
  image: Image;
};

const ImageUploadPreview = ({image}: ImageUploadPreviewProps) => {
  return image?.filename ? <UrlPic file={image.filename} size="2xl" border={3} /> : null;
};

export default ImageUploadPreview;
