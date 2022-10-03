import React from 'react';
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
import Separator from '../../../../components/layouts/Separator';

type GroupListCardHeaderProps = {
  group: Group;
  collapsed: boolean;
  sorting: boolean;
  drag: () => void;
};

const GroupListCardHeader = ({group, collapsed, sorting, drag}: GroupListCardHeaderProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (): void => !sorting && navigation.navigate('GroupView', {group});

  const separatorBg = useColorModeValue('tertiary.300', 'tertiary.400');

  return (
    <PressableButton onPress={goToGroupView}>
      <Separator bg={separatorBg} />
      <Box position="relative" h="50px" px="4" justifyContent="center">
        <Box position="absolute" left="0" right="0" top="0" bottom="0" bg={LINEAR_GRADIENT} opacity="0.1" />
        <FHStack defaultSpace alignItems="center">
          {group?.imageFilename && <UrlPic file={group.imageFilename} size="9" border={1} invertedBorder />}
          <Text fontSize="lg" color="primary.500" isTruncated>
            {group.title}
          </Text>
          <FHStack grow space="2" alignItems="center" justifyContent="flex-end">
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
      <Separator bg={separatorBg} />
    </PressableButton>
  );
};

export default GroupListCardHeader;
