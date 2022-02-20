import React, {FC} from 'react';
import {ArrowBackIcon, Box, HStack, Pressable, StatusBar, Text, useTheme} from 'native-base';
import {RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import MenuIcon from '../icons/MenuIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type HeaderProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
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
            <Pressable _pressed={{opacity: 0.7}} onPress={goBack}>
              <ArrowBackIcon color="white" size="8" />
            </Pressable>
          )}
          <Pressable _pressed={{opacity: 0.7}} onPress={toggleDrawer}>
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
