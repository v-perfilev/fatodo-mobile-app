import React, {FC} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Box, Center, HStack, Pressable, Text} from 'native-base';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationHelpers, ParamListBase, TabNavigationState} from '@react-navigation/native';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs/src/types';

type TabNavigatorBarProps = BottomTabBarProps;

type TabNavigatorItemProps = {
  routeName: string;
  routeKey: string;
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  index: number;
};

const TabNavigatorItem: FC<TabNavigatorItemProps> = ({routeName, routeKey, state, descriptors, navigation, index}) => {
  const {options} = descriptors[routeKey];
  const label = options.tabBarLabel || options.title || routeName;
  const opacity = state.index === index ? 1 : 0.5;

  const onPress = () => navigation.navigate(routeName);

  return (
    <Pressable flex={1} p="3" cursor="pointer" opacity={opacity} onPress={onPress}>
      <Center>
        <Text color="white" fontSize="10">
          {label}
        </Text>
      </Center>
    </Pressable>
  );
};

const TabNavigatorBar: FC<TabNavigatorBarProps> = ({state, descriptors, navigation}) => {
  return (
    <Box safeAreaTop width="100%">
      <HStack bg="primary.500" safeAreaBottom shadow={6}>
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
    </Box>
  );
};

export default TabNavigatorBar;
