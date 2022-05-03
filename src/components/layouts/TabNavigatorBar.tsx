import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Center, HStack, Pressable, Text} from 'native-base';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationHelpers, ParamListBase, TabNavigationState} from '@react-navigation/native';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs/src/types';
import {useTranslation} from 'react-i18next';
import {ColorType} from 'native-base/lib/typescript/components/types';

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
  const opacity = isFocused ? 1 : 0.5;

  const onPress = () => navigation.navigate(routeName);

  return (
    <Pressable flex="1" p="2" opacity={opacity} onPress={onPress}>
      <Center>
        {icon && icon({focused: isFocused, color: 'white', size: 6})}
        <Text color="white" fontSize="10">
          {label}
        </Text>
      </Center>
    </Pressable>
  );
};

const TabNavigatorBar =
  (color: ColorType) =>
  ({state, descriptors, navigation}: TabNavigatorBarProps) => {
    return (
      <HStack bg={color}>
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
      </HStack>
    );
  };

export default TabNavigatorBar;
