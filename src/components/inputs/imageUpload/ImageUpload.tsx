import React, {FC, useEffect, useState} from 'react';
import {FormikProps} from 'formik';
import {Image} from '../../../models/Image';
import {Box, FormControl, IFormControlProps} from 'native-base';
import ImageUploadPreview from './ImageUploadPreview';
import ImageUploadButtons from './ImageUploadButtons';

type ImageUploadProps = IFormControlProps &
  FormikProps<any> & {
    filenameName: string;
    contentName: string;
    label?: string;
    crop?: any;
    preview?: boolean;
  };

const ImageUpload: FC<ImageUploadProps> = (props) => {
  const {filenameName, contentName, label, crop, preview = false} = props;
  const {values, setFieldValue} = props;
  const [image, setImage] = useState<Image>(null);

  const filenameValue = values[filenameName];

  useEffect(() => {
    if (filenameValue) {
      const image = {filename: filenameValue};
      setImage(image);
    }
  }, []);

  useEffect(() => {
    setFieldValue(filenameName, image?.filename);
    setFieldValue(contentName, image?.content);
  }, [image]);

  return (
    <FormControl {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      {preview && (
        <Box my="0.5">
          <ImageUploadPreview image={image} />
        </Box>
      )}
      <Box my="0.5">
        <ImageUploadButtons image={image} setImage={setImage} crop={crop} />
      </Box>
    </FormControl>
  );
};

export default ImageUpload;
