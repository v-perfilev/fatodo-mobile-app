import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Text} from 'native-base';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ColoredStatusBar from './ColoredStatusBar';
import UrlPic from '../surfaces/UrlPic';
import ArrowBackIcon from '../icons/ArrowBackIcon';
import FHStack from '../boxes/FHStack';
import Logo from './Logo';
import IconButton from '../controls/IconButton';
import {HEADER_HEIGHT} from '../../constants';

type HeaderProps = PropsWithChildren<{
  title?: string;
  imageFilename?: string;
  hideGoBack?: boolean;
  hideLogo?: boolean;
  hideTitle?: boolean;
}>;

const Header = ({children, title, imageFilename, hideGoBack, hideLogo, hideTitle}: HeaderProps) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {t} = useTranslation();
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  const label = title || t('routes.' + route.name);

  const goBack = (): void => navigation.goBack();

  useEffect(() => {
    isFocused && setCanGoBack(navigation.canGoBack());
  }, [isFocused]);

  return (
    <>
      <ColoredStatusBar />
      <FHStack h={HEADER_HEIGHT} defaultSpace px="2" bg="primary.500" alignItems="center">
        {!hideGoBack && canGoBack && (
          <IconButton colorScheme="white" size="2xl" p="1" icon={<ArrowBackIcon />} onPress={goBack} />
        )}
        {!hideLogo && <Logo size="40px" />}
        {!hideTitle && imageFilename && <UrlPic file={imageFilename} size="9" border="1" invertedBorder />}
        {!hideTitle && (
          <Text fontWeight="800" fontSize="xl" lineHeight="xl" color="white" isTruncated>
            {label}
          </Text>
        )}
        <FHStack grow h="100%" space="2" alignItems="center" justifyContent="flex-end">
          {children}
        </FHStack>
      </FHStack>
    </>
  );
};

export default Header;
