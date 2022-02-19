import React, {FC, useEffect} from 'react';
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerNavigationEventMap} from '@react-navigation/drawer';
import {Box, HStack, Pressable, Text, VStack} from 'native-base';
import {DrawerNavigationState, NavigationHelpers, ParamListBase} from '@react-navigation/native';
import {DrawerDescriptorMap} from '@react-navigation/drawer/lib/typescript/src/types';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import {useTranslation} from 'react-i18next';
import LanguageMenu from '../controls/LanguageMenu';

type RootNavigatorItemProps = {
  routeName: string;
  routeKey: string;
  state: DrawerNavigationState<ParamListBase>;
  descriptors: DrawerDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, DrawerNavigationEventMap>;
  index: number;
};

const RootNavigatorItem: FC<RootNavigatorItemProps> = ({
  routeName,
  routeKey,
  state,
  descriptors,
  navigation,
  index,
}) => {
  const {t} = useTranslation();
  const {options} = descriptors[routeKey];
  const isFocused = state.index === index;
  const label = t('routes.' + routeName);
  const icon = options.drawerIcon;
  const color = isFocused ? 'primary.500' : 'gray.600';

  const onPress = () => navigation.navigate(routeName);

  return (
    <Pressable flex="1" cursor="pointer" onPress={onPress}>
      <HStack space="5" alignItems="center">
        {icon && icon({focused: isFocused, color: color, size: 7})}
        <Text fontWeight="600" color={color} fontSize="16">
          {label}
        </Text>
      </HStack>
    </Pressable>
  );
};

const RootNavigatorDrawer: FC<DrawerContentComponentProps> = (props) => {
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
      <Box flex="1" flexGrow="1">
        <VStack space="8" my="6" mx="8">
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
        </VStack>
      </Box>
      <Box flex="1" flexGrow="0">
        <VStack space="8" my="6" mx="8">
          <LanguageMenu space="5" />
        </VStack>
      </Box>
    </DrawerContentScrollView>
  );
};

export default RootNavigatorDrawer;
