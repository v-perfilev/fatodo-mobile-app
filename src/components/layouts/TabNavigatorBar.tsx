import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Badge, Box, Pressable} from 'native-base';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationHelpers, ParamListBase, TabNavigationState} from '@react-navigation/native';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs/src/types';
import FHStack from '../boxes/FHStack';
import FCenter from '../boxes/FCenter';
import Separator from './Separator';

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
  const {options} = descriptors[routeKey];
  const isFocused = state.index === index;
  const icon = options.tabBarIcon;
  const badge = options.tabBarBadge;
  const iconColor = isFocused ? 'primary.500' : 'gray.400';

  const onPress = (): void => navigation.navigate(routeName);

  const showBadgeNode = badge !== undefined && badge !== 0;

  const badgeNode = (
    <Badge rounded="full" variant="solid" colorScheme="secondary" position="absolute" left={4} bottom={2} zIndex={1}>
      {badge}
    </Badge>
  );

  return (
    <Pressable flex="1" p="3" onPress={onPress}>
      <FCenter>
        <Box>
          {showBadgeNode && badgeNode}
          {icon({focused: isFocused, color: iconColor, size: 8})}
        </Box>
      </FCenter>
    </Pressable>
  );
};

const TabNavigatorBar = ({state, descriptors, navigation}: TabNavigatorBarProps) => {
  return (
    <>
      <Separator />
      <FHStack safeAreaBottom>
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
    </>
  );
};

export default TabNavigatorBar;
