import React from 'react';
import {Box, Text, useColorModeValue} from 'native-base';
import {Group} from '../../../models/Group';
import {LINEAR_GRADIENT_FUNC, ThemeFactory} from '../../../shared/themes/ThemeFactory';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';
import PressableButton from '../../../components/controls/PressableButton';

type ItemGroupProps = {
  group: Group;
};

const ItemGroup = ({group}: ItemGroupProps) => {
  const groupNavigation = useNavigation<GroupNavigationProps>();

  const theme = ThemeFactory.getTheme(group.color);
  const bgOpacity = useColorModeValue(0.2, 0.3);
  const titleColor = useColorModeValue(theme.colors.primary['500'], 'gray.100');

  const goToGroupView = (): void => groupNavigation.navigate('GroupView', {group});

  return (
    <PressableButton onPress={goToGroupView}>
      <Box position="relative" px="2" pt="0.25" pb="0.5" borderRadius="lg" overflow="hidden">
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bg={LINEAR_GRADIENT_FUNC(theme)}
          opacity={bgOpacity}
        />
        <Text fontSize="sm" color={titleColor} isTruncated>
          {group.title}
        </Text>
      </Box>
    </PressableButton>
  );
};

export default ItemGroup;
