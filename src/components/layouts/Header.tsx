import React, {FC} from 'react';
import {ArrowDownIcon, Box, HStack, Pressable, StatusBar, Text, useTheme} from 'native-base';
import {NavigationContainerEventMap, NavigationHelpers, ParamListBase, RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import MenuIcon from '../icons/MenuIcon';

export type HeaderProps = {
  navigation: NavigationHelpers<ParamListBase, NavigationContainerEventMap>;
  route: RouteProp<ParamListBase>;
};

const Header: FC<HeaderProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {toggleDrawer} = useDrawerContext();
  const label = t('routes.' + route.name);

  const canGoBack = navigation.canGoBack();
  const goBack = (): void => navigation.goBack();

  const backgroundColor = theme.colors.primary['500'];

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle="light-content" />
      <Box safeAreaBottom width="100%">
        <HStack space="5" px="4" py="2.5" bg="primary.500" alignItems="center">
          {canGoBack && (
            <Pressable cursor="pointer" onPress={goBack}>
              <ArrowDownIcon />
            </Pressable>
          )}
          <Pressable cursor="pointer" onPress={toggleDrawer}>
            <MenuIcon color="white" size="8" />
          </Pressable>
          <Text fontWeight="800" fontSize="20" color="white">
            {label}
          </Text>
        </HStack>
      </Box>
    </>
  );
};

export default Header;
