import React, {FC, PropsWithChildren} from 'react';
import {ArrowBackIcon, HStack, Text} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import MenuIcon from '../icons/MenuIcon';
import PressableButton from '../controls/PressableButton';
import CustomStatusBar from './CustomStatusBar';
import UrlPic from '../surfaces/UrlPic';

type HeaderProps = PropsWithChildren<any> & {
  title?: string;
  imageFilename?: string;
  showMenu?: boolean;
};

const Header: FC<HeaderProps> = ({children, title, imageFilename, showMenu = true}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {t} = useTranslation();

  const {toggleDrawer} = useDrawerContext();
  const label = title || t('routes.' + route.name);

  const canGoBack = navigation.canGoBack() && navigation.getState().routes.length > 1;
  const goBack = (): void => navigation.goBack();

  return (
    <>
      <CustomStatusBar />
      <HStack h="12" space="3" px="4" bg="primary.500" alignItems="center">
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
        {imageFilename && <UrlPic url={imageFilename} size="9" border={1} invertedBorder />}
        <Text fontWeight="800" fontSize="20" color="white" isTruncated>
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
