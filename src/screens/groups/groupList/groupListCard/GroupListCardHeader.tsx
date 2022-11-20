import React, {memo} from 'react';
import {Box, Text, useColorModeValue} from 'native-base';
import GroupListCardCollapseButton from './GroupListCardCollapseButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import UrlPic from '../../../../components/surfaces/UrlPic';
import GroupListCardMenuButton from './GroupListCardMenuButton';
import {LINEAR_GRADIENT_FUNC, ThemeFactory} from '../../../../shared/themes/ThemeFactory';
import {Group} from '../../../../models/Group';
import FHStack from '../../../../components/boxes/FHStack';
import GroupListCardDragButton from './GroupListCardDragButton';
import PressableButton from '../../../../components/controls/PressableButton';
import {DARK_BG, LIGHT_BG} from '../../../../shared/themes/colors';

type GroupListCardHeaderProps = {
  group: Group;
  collapsed: boolean;
  sorting: boolean;
  drag: () => void;
};

const GroupListCardHeader = ({group, collapsed, sorting, drag}: GroupListCardHeaderProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const theme = ThemeFactory.getTheme(group.color);

  const goToGroupView = (): void => !sorting && navigation.navigate('GroupView', {group});

  const bg = useColorModeValue(LIGHT_BG, DARK_BG);
  const bgOpacity = useColorModeValue(0.2, 0.3);
  const titleColor = useColorModeValue(theme.colors.primary['500'], 'gray.100');

  return (
    <PressableButton onPress={goToGroupView}>
      <Box
        position="relative"
        h="50px"
        mx="1"
        px="3"
        pr="2"
        borderRadius="xl"
        overflow="hidden"
        justifyContent="center"
        bg={sorting ? bg : undefined}
      >
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
          <Text fontSize="lg" color={titleColor} isTruncated>
            {group.title}
          </Text>
          <FHStack grow space="1" alignItems="center" justifyContent="flex-end">
            {sorting ? (
              <GroupListCardDragButton drag={drag} colorScheme={group.color} />
            ) : (
              <>
                <GroupListCardCollapseButton group={group} collapsed={collapsed} colorScheme={group.color} />
                <GroupListCardMenuButton group={group} colorScheme={group.color} />
              </>
            )}
          </FHStack>
        </FHStack>
      </Box>
    </PressableButton>
  );
};

export default memo(GroupListCardHeader);
