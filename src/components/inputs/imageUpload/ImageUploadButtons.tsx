import React, {FC} from 'react';
import {Image} from '../../../models/Image';
import {HStack, Theme, useTheme} from 'native-base';
import SolidButton from '../../controls/SolidButton';
import {useTranslation} from 'react-i18next';
import {openPicker, Options} from 'react-native-image-crop-picker';
import {ImageUtils} from '../../../shared/utils/imageUtils';
import {IMAGE_SIZE} from '../../../constants';

type ImageUploadButtonsProps = {
  image: Image;
  setImage: (image: Image) => void;
  crop: boolean;
};

const imageOptions = (theme: Theme, crop: boolean): Options => ({
  includeBase64: true,
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
  cropping: crop,
  // android
  cropperStatusBarColor: theme.colors.primary['700'],
  cropperActiveWidgetColor: theme.colors.secondary['500'],
  cropperToolbarColor: theme.colors.primary['500'],
  cropperToolbarWidgetColor: theme.colors.white,
  // ios
});

const ImageUploadButtons: FC<ImageUploadButtonsProps> = ({image, setImage, crop}) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const selectImage = (): void => {
    openPicker({...imageOptions(theme, crop), mediaType: 'photo'})
      .then((image) => {
        const uri = ImageUtils.base64ToUrl(image.mime, image?.data);
        const blob = ImageUtils.base64ToBlob(image.data);
        setImage({filename: uri, content: blob});
      })
      .catch(() => {
        // skip
      });
  };

  const clearImage = (): void => {
    setImage(null);
  };

  return (
    <HStack space="3">
      <SolidButton size="sm" onPress={selectImage}>
        {image ? t('common:imageUpload.buttons.update') : t('common:imageUpload.buttons.upload')}
      </SolidButton>
      <SolidButton size="sm" colorScheme="secondary" onPress={clearImage}>
        {t('common:imageUpload.buttons.clear')}
      </SolidButton>
    </HStack>
  );
};

export default ImageUploadButtons;
