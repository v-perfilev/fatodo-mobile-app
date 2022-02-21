import React, {FC, PropsWithChildren} from 'react';
import {ArrowBackIcon, Box, HStack, StatusBar, Text, useTheme} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import MenuIcon from '../icons/MenuIcon';
import PressableButton from '../controls/PressableButton';

type HeaderProps = PropsWithChildren<any>;

const Header: FC<HeaderProps> = ({children}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {t} = useTranslation();
  const theme = useTheme();
  const {toggleDrawer} = useDrawerContext();
  const label = t('routes.' + route.name);

  const canGoBack = navigation.canGoBack() && navigation.getState().routes.length > 1;
  const goBack = (): void => navigation.goBack();

  const backgroundColor = theme.colors.primary['500'];

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle="light-content" />
      <Box safeAreaBottom width="100%">
        <HStack h="12" space="5" px="4" bg="primary.500" alignItems="center">
          {canGoBack && (
            <PressableButton onPress={goBack}>
              <ArrowBackIcon color="white" size="7" />
            </PressableButton>
          )}
          <PressableButton onPress={toggleDrawer}>
            <MenuIcon color="white" size="7" />
          </PressableButton>
          <Text fontWeight="800" fontSize="20" color="white">
            {label}
          </Text>
          <HStack flex="1" space="2" alignItems="center" justifyContent="flex-end">
            {children}
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default Header;
