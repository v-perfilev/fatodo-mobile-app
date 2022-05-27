import React, {memo, useEffect, useState} from 'react';
import {FormikProps} from 'formik';
import {Image} from '../../../models/Image';
import {FormControl, IFormControlProps} from 'native-base';
import ImageUploadPreview from './ImageUploadPreview';
import ImageUploadButtons from './ImageUploadButtons';
import {flowRight} from 'lodash';
import FVStack from '../../surfaces/FVStack';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';

type ImageUploadProps = IFormControlProps &
  FormikProps<any> & {
    filenameName: string;
    contentName: string;
    label?: string;
    crop?: any;
    preview?: boolean;
  };

const ImageUpload = (props: ImageUploadProps) => {
  const {filenameName, contentName, setFieldError, label, crop, preview = false} = props;
  const {values, setFieldValue} = props;
  const [image, setImage] = useState<Image>(null);
  const [loading, setLoading] = useLoadingState(false);

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

  useEffect(() => {
    setFieldError(filenameName, loading ? 'loading' : undefined);
  }, [loading]);

  return (
    <FormControl {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <FVStack smallSpace>
        {preview && <ImageUploadPreview image={image} />}
        <ImageUploadButtons image={image} setImage={setImage} crop={crop} loading={loading} setLoading={setLoading} />
      </FVStack>
    </FormControl>
  );
};

export default flowRight([memo])(ImageUpload);
