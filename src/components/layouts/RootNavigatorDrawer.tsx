import React, {useEffect} from 'react';
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerNavigationEventMap} from '@react-navigation/drawer';
import {Box, Pressable, Text} from 'native-base';
import {DrawerNavigationState, NavigationHelpers, ParamListBase} from '@react-navigation/native';
import {DrawerDescriptorMap} from '@react-navigation/drawer/lib/typescript/src/types';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import {useTranslation} from 'react-i18next';
import LanguageMenu from '../controls/LanguageMenu';
import FVStack from '../surfaces/FVStack';
import FHStack from '../surfaces/FHStack';

type RootNavigatorItemProps = {
  routeName: string;
  routeKey: string;
  state: DrawerNavigationState<ParamListBase>;
  descriptors: DrawerDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, DrawerNavigationEventMap>;
  index: number;
};

const RootNavigatorItem = ({routeName, routeKey, state, descriptors, navigation, index}: RootNavigatorItemProps) => {
  const {t} = useTranslation();
  const {options} = descriptors[routeKey];
  const isFocused = state.index === index;
  const label = t('routes.' + routeName);
  const icon = options.drawerIcon;
  const color = isFocused ? 'primary.500' : 'gray.600';

  const onPress = () => navigation.navigate(routeName);

  return (
    <Pressable _pressed={{opacity: 0.7}} onPress={onPress}>
      <FHStack defaultSpace alignItems="center">
        {icon && icon({focused: isFocused, color: color, size: 7})}
        <Text color={color} fontWeight="600" fontSize="md">
          {label}
        </Text>
      </FHStack>
    </Pressable>
  );
};

const RootNavigatorDrawer = (props: DrawerContentComponentProps) => {
  const {state, descriptors, navigation} = props;
  const {setToggleDrawer} = useDrawerContext();

  useEffect(() => {
    if (navigation.toggleDrawer) {
      setToggleDrawer(() => navigation.toggleDrawer);
    }
  }, [navigation.toggleDrawer]);

  const containerStyle = {flexGrow: 1};

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={containerStyle}>
      <Box flexGrow="1" m="8">
        <FVStack space="6">
          {state.routes.map((route, index) => (
            <RootNavigatorItem
              routeKey={route.key}
              routeName={route.name}
              state={state}
              descriptors={descriptors}
              navigation={navigation}
              index={index}
              key={index}
            />
          ))}
        </FVStack>
      </Box>
      <Box m="8">
        <LanguageMenu />
      </Box>
    </DrawerContentScrollView>
  );
};

export default RootNavigatorDrawer;
