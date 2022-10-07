import React, {memo} from 'react';
import {Box, Text, useColorModeValue} from 'native-base';
import GroupListCardCollapseButton from './GroupListCardCollapseButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import UrlPic from '../../../../components/surfaces/UrlPic';
import GroupListCardMenuButton from './GroupListCardMenuButton';
import {LINEAR_GRADIENT} from '../../../../shared/themes/ThemeFactory';
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

  const goToGroupView = (): void => !sorting && navigation.navigate('GroupView', {group});

  const bg = useColorModeValue(LIGHT_BG, DARK_BG);
  const bgOpacity = useColorModeValue(0.1, 0.15);
  const titleColor = useColorModeValue('primary.500', 'gray.100');

  return (
    <PressableButton onPress={goToGroupView}>
      <Box position="relative" h="50px" px="4" pr="3" justifyContent="center" bg={sorting ? bg : undefined}>
        <Box position="absolute" left="0" right="0" top="0" bottom="0" bg={LINEAR_GRADIENT} opacity={bgOpacity} />
        <FHStack defaultSpace alignItems="center">
          {group?.imageFilename && <UrlPic file={group.imageFilename} size="9" border={1} />}
          <Text fontSize="lg" color={titleColor} isTruncated>
            {group.title}
          </Text>
          <FHStack grow smallSpace alignItems="center" justifyContent="flex-end">
            {sorting ? (
              <GroupListCardDragButton drag={drag} />
            ) : (
              <>
                <GroupListCardCollapseButton group={group} collapsed={collapsed} />
                <GroupListCardMenuButton group={group} />
              </>
            )}
          </FHStack>
        </FHStack>
      </Box>
    </PressableButton>
  );
};

export default memo(GroupListCardHeader);
