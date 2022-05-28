import React, {PropsWithChildren, useCallback, useEffect, useState} from 'react';
import {Text} from 'native-base';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import PressableButton from '../controls/PressableButton';
import ColoredStatusBar from './ColoredStatusBar';
import UrlPic from '../surfaces/UrlPic';
import ArrowBackIcon from '../icons/ArrowBackIcon';
import FHStack from '../boxes/FHStack';
import Logo from './Logo';

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

  const goBack = useCallback(() => navigation.goBack(), [isFocused]);

  useEffect(() => {
    if (isFocused) {
      setCanGoBack(navigation.canGoBack());
    }
  }, [isFocused]);

  return (
    <>
      <ColoredStatusBar />
      <FHStack h="50px" defaultSpace px="2" bg="primary.500" alignItems="center">
        {!hideGoBack && canGoBack && (
          <PressableButton onPress={goBack}>
            <ArrowBackIcon color="white" size="7" />
          </PressableButton>
        )}
        {!hideLogo && <Logo size="35px" />}
        {!hideTitle && imageFilename && <UrlPic file={imageFilename} size="9" border="1" invertedBorder />}
        {!hideTitle && (
          <Text fontWeight="800" fontSize="20" lineHeight="24" color="white" isTruncated>
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
