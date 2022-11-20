import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Badge, Pressable, Text} from 'native-base';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationHelpers, ParamListBase, TabNavigationState} from '@react-navigation/native';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs/src/types';
import FHStack from '../boxes/FHStack';
import FCenter from '../boxes/FCenter';
import Separator from './Separator';
import {useTranslation} from 'react-i18next';
import FVStack from '../boxes/FVStack';
import {TAB_HEIGHT} from '../../constants';
import {Platform} from 'react-native';

type TabNavigatorBarProps = BottomTabBarProps;

type TabNavigatorItemProps = {
  routeName: string;
  routeKey: string;
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  index: number;
};

const TabNavigatorItem = ({routeName, routeKey, state, descriptors, navigation, index}: TabNavigatorItemProps) => {
  const {t} = useTranslation();
  const {options} = descriptors[routeKey];
  const isFocused = state.index === index;
  const icon = options.tabBarIcon;
  const badge = options.tabBarBadge;
  const color = isFocused ? 'primary.500' : 'gray.400';

  const onPress = (): void => navigation.navigate(routeName);

  const showBadgeNode = badge !== undefined && badge !== 0;

  const badgeNode = (
    <Badge rounded="full" variant="solid" colorScheme="secondary" position="absolute" left={4} bottom={2} zIndex={1}>
      {badge}
    </Badge>
  );

  const height = TAB_HEIGHT;
  const size = Platform.OS === 'android' ? 7 : 8;

  return (
    <Pressable height={height} flex="1" p="1" onPress={onPress}>
      <FVStack grow justifyContent="center" alignItems="center">
        <FCenter flex="1" flexGrow="1">
          {showBadgeNode && badgeNode}
          {icon({focused: isFocused, color, size})}
        </FCenter>
        <Text fontSize="2xs" color={color} isTruncated>
          {t('routes.' + routeName)}
        </Text>
      </FVStack>
    </Pressable>
  );
};

const TabNavigatorBar = ({state, descriptors, navigation}: TabNavigatorBarProps) => {
  const height = TAB_HEIGHT;

  return (
    <FVStack safeAreaBottom height={height}>
      <Separator />
      <FHStack grow>
        {state.routes.map((route, index) => (
          <TabNavigatorItem
            routeKey={route.key}
            routeName={route.name}
            state={state}
            descriptors={descriptors}
            navigation={navigation}
            index={index}
            key={index}
          />
        ))}
      </FHStack>
    </FVStack>
  );
};

export default TabNavigatorBar;
