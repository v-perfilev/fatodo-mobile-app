import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Badge, Box, Pressable, Text} from 'native-base';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationHelpers, ParamListBase, TabNavigationState} from '@react-navigation/native';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs/src/types';
import {useTranslation} from 'react-i18next';
import {ColorType} from 'native-base/lib/typescript/components/types';
import FHStack from '../boxes/FHStack';
import FCenter from '../boxes/FCenter';

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
  const label = t('routes.' + routeName);
  const icon = options.tabBarIcon;
  const badge = options.tabBarBadge;
  const opacity = isFocused ? 1 : 0.7;

  const onPress = () => navigation.navigate(routeName);

  const showBadgeNode = badge !== undefined && badge !== 0;

  const badgeNode = (
    <Badge rounded="full" variant="solid" colorScheme="secondary" position="absolute" left={4} bottom={2} zIndex={1}>
      {badge}
    </Badge>
  );

  return (
    <Pressable flex="1" p="2" onPress={onPress}>
      <FCenter>
        <Box>
          {showBadgeNode && badgeNode}
          <Box opacity={opacity}>{icon({focused: isFocused, color: 'white', size: 6})}</Box>
        </Box>
        <Text color="white" fontSize="2xs" opacity={opacity}>
          {label}
        </Text>
      </FCenter>
    </Pressable>
  );
};

const TabNavigatorBar =
  (color: ColorType) =>
  ({state, descriptors, navigation}: TabNavigatorBarProps) => {
    return (
      <FHStack bg={color} safeAreaBottom>
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
    );
  };

export default TabNavigatorBar;
