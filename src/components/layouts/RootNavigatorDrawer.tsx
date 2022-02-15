import React, {FC} from 'react';
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerNavigationEventMap} from '@react-navigation/drawer';
import {Center, Pressable, Text, VStack} from 'native-base';
import {DrawerNavigationState, NavigationHelpers, ParamListBase} from '@react-navigation/native';
import {DrawerDescriptorMap} from '@react-navigation/drawer/lib/typescript/src/types';

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
  const {options} = descriptors[routeKey];
  const isFocused = state.index === index;
  const label = options.drawerLabel || routeName;
  const icon = options.drawerIcon;
  const opacity = isFocused ? 1 : 0.5;

  const onPress = () => navigation.navigate(routeName);

  return (
    <Pressable flex={1} p="3" cursor="pointer" opacity={opacity} onPress={onPress}>
      <Center>
        {icon && icon({focused: isFocused, color: 'white', size: 6})}
        <Text color="white" fontSize="10">
          {label}
        </Text>
      </Center>
    </Pressable>
  );
};

const RootNavigatorDrawer: FC<DrawerContentComponentProps> = (props) => {
  const {state, descriptors, navigation} = props;

  return (
    <DrawerContentScrollView {...props}>
      <VStack space={6} my={2} mx={1}>
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
    </DrawerContentScrollView>
  );
};

export default RootNavigatorDrawer;
