import React, {PropsWithChildren} from 'react';
import {Text} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import MenuIcon from '../icons/MenuIcon';
import PressableButton from '../controls/PressableButton';
import ColoredStatusBar from './ColoredStatusBar';
import UrlPic from '../surfaces/UrlPic';
import ArrowBackIcon from '../icons/ArrowBackIcon';
import FHStack from '../surfaces/FHStack';

type HeaderProps = PropsWithChildren<{
  title?: string;
  imageFilename?: string;
  showGoBack?: boolean;
  showMenu?: boolean;
  showTitle?: boolean;
}>;

const Header = ({
  children,
  title,
  imageFilename,
  showGoBack = true,
  showMenu = true,
  showTitle = false,
}: HeaderProps) => {
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
      <FHStack h="50px" defaultSpace px="2" bg="primary.500" alignItems="center">
        {showGoBack && canGoBack && (
          <PressableButton onPress={goBack}>
            <ArrowBackIcon color="white" size="7" />
          </PressableButton>
        )}
        {showMenu && (
          <PressableButton onPress={toggleDrawer}>
            <MenuIcon color="white" size="7" />
          </PressableButton>
        )}
        {showTitle && (
          <>
            {!!imageFilename && <UrlPic file={imageFilename} size="9" border="1" invertedBorder />}
            <Text fontWeight="800" fontSize="20" lineHeight="24" color="white" isTruncated>
              {label}
            </Text>
          </>
        )}
        <FHStack grow h="100%" space="2" alignItems="center" justifyContent="flex-end">
          {children}
        </FHStack>
      </FHStack>
    </>
  );
};

export default Header;
