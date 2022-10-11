import React from 'react';
import {Image} from '../../../models/Image';
import {Theme, useTheme} from 'native-base';
import {useTranslation} from 'react-i18next';
import {openPicker, Options} from 'react-native-image-crop-picker';
import {IMAGE_SIZE} from '../../../constants';
import {ImageUtils} from '../../../shared/utils/ImageUtils';
import FHStack from '../../boxes/FHStack';
import OutlinedButton from '../../controls/OutlinedButton';

type ImageUploadButtonsProps = {
  image: Image;
  setImage: (image: Image) => void;
  crop: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const imageOptions = (theme: Theme, crop: boolean): Options => ({
  includeBase64: true,
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
  cropping: crop,
  compressImageQuality: 0.4,
  // android
  cropperStatusBarColor: theme.colors.primary['700'],
  cropperActiveWidgetColor: theme.colors.secondary['500'],
  cropperToolbarColor: theme.colors.primary['500'],
  cropperToolbarWidgetColor: theme.colors.white,
  // ios
});

const ImageUploadButtons = ({image, setImage, crop, loading, setLoading}: ImageUploadButtonsProps) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const selectImage = (): void => {
    setLoading(true);
    openPicker({...imageOptions(theme, crop), mediaType: 'photo'})
      .then((image) => {
        const filename = ImageUtils.convertPathToUri(image.path);
        const content = ImageUtils.convertPathToContent(image.path);
        setImage({filename, content});
      })
      .catch(() => {
        // skip
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearImage = (): void => {
    setImage(null);
  };

  return (
    <FHStack defaultSpace>
      <OutlinedButton size="sm" onPress={selectImage} isLoading={loading}>
        {image ? t('common:imageUpload.buttons.update') : t('common:imageUpload.buttons.upload')}
      </OutlinedButton>
      {image?.filename && (
        <OutlinedButton size="sm" colorScheme="secondary" isDisabled={loading} onPress={clearImage}>
          {t('common:imageUpload.buttons.clear')}
        </OutlinedButton>
      )}
    </FHStack>
  );
};

export default ImageUploadButtons;
