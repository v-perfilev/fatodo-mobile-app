import React, {PropsWithChildren} from 'react';
import {HStack, Text} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import MenuIcon from '../icons/MenuIcon';
import PressableButton from '../controls/PressableButton';
import ColoredStatusBar from './ColoredStatusBar';
import UrlPic from '../surfaces/UrlPic';
import ArrowBackIcon from '../icons/ArrowBackIcon';

type HeaderProps = PropsWithChildren<{
  title?: string;
  imageFilename?: string;
  showMenu?: boolean;
}>;

const Header = ({children, title, imageFilename, showMenu = true}: HeaderProps) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {t} = useTranslation();

  const {toggleDrawer} = useDrawerContext();
  const label = title || t('routes.' + route.name);

  const canGoBack = navigation.canGoBack() && navigation.getState().routes.length > 1;
  const goBack = (): void => navigation.goBack();

  return (
    <>
      <ColoredStatusBar />
      <HStack h="12" space="2" px="2" bg="primary.500" alignItems="center">
        {canGoBack && (
          <PressableButton onPress={goBack}>
            <ArrowBackIcon color="white" size="7" />
          </PressableButton>
        )}
        {showMenu && (
          <PressableButton onPress={toggleDrawer}>
            <MenuIcon color="white" size="7" />
          </PressableButton>
        )}
        {!!imageFilename && <UrlPic file={imageFilename} size="9" border={1} invertedBorder />}
        <Text fontWeight="800" fontSize="20" lineHeight="24" color="white" isTruncated>
          {label}
        </Text>
        <HStack flex="1" space="2" alignItems="center" justifyContent="flex-end">
          {children}
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
