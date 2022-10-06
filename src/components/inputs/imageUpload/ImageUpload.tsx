import React, {memo, useEffect, useState} from 'react';
import {FormikProps} from 'formik';
import {Image} from '../../../models/Image';
import {FormControl, IFormControlProps} from 'native-base';
import ImageUploadPreview from './ImageUploadPreview';
import ImageUploadButtons from './ImageUploadButtons';
import FVStack from '../../boxes/FVStack';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';

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
  const [loading, setLoading] = useDelayedState(false);

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
      <FVStack defaultSpace>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        {preview && <ImageUploadPreview image={image} />}
        <ImageUploadButtons image={image} setImage={setImage} crop={crop} loading={loading} setLoading={setLoading} />
      </FVStack>
    </FormControl>
  );
};

export default memo(ImageUpload);
