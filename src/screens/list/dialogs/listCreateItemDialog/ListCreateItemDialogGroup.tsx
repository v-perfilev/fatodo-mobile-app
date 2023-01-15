import React, {memo} from 'react';
import {Group} from '../../../../models/Group';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../../navigators/GroupNavigator';
import {Box, Text, useColorModeValue} from 'native-base';
import UrlPic from '../../../../components/surfaces/UrlPic';
import FHStack from '../../../../components/boxes/FHStack';
import PressableButton from '../../../../components/controls/PressableButton';
import {LINEAR_GRADIENT_FUNC, ThemeFactory} from '../../../../shared/themes/ThemeFactory';

export type ListCreateItemDialogGroupProps = {
  group: Group;
  close: () => void;
};

const ListCreateItemDialogGroup = ({group, close}: ListCreateItemDialogGroupProps) => {
  const groupNavigation = useNavigation<GroupNavigationProps>();
  const theme = ThemeFactory.getTheme(group.color);

  const bgOpacity = useColorModeValue(0.2, 0.3);
  const titleColor = useColorModeValue(theme.colors.primary['500'], 'gray.100');

  const handlePress = (): void => {
    close();
    groupNavigation.navigate('ItemCreate', {group});
  };

  return (
    <PressableButton py="5px" onPress={handlePress}>
      <Box position="relative" h="50px" mx="1" px="3" borderRadius="xl" overflow="hidden" justifyContent="center">
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bg={LINEAR_GRADIENT_FUNC(theme)}
          opacity={bgOpacity}
        />
        <FHStack space="3" alignItems="center">
          {group?.imageFilename && <UrlPic file={group.imageFilename} colorScheme={group.color} size="9" border={1} />}
          <Text fontSize="md" color={titleColor} isTruncated>
            {group.title}
          </Text>
        </FHStack>
      </Box>
    </PressableButton>
  );
};

export default memo(ListCreateItemDialogGroup);
