import React from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import GroupListCardCollapseButton from './GroupListCardCollapseButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import UrlPic from '../../../../components/surfaces/UrlPic';
import GroupListCardMenuButton from './GroupListCardMenuButton';
import PressableButton from '../../../../components/controls/PressableButton';
import ReorderIcon from '../../../../components/icons/ReorderIcon';
import {LINEAR_GRADIENT} from '../../../../shared/themes/ThemeFactory';
import {Group} from '../../../../models/Group';

type GroupListCardHeaderProps = {
  group: Group;
  collapsed: boolean;
  sorting: boolean;
  drag: () => void;
};

const GroupListCardHeader = ({group, collapsed, sorting, drag}: GroupListCardHeaderProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (): void => {
    navigation.navigate('GroupView', {groupId: group?.id});
  };

  return (
    <Pressable onPress={goToGroupView}>
      <Box h="45" px="2" bg={LINEAR_GRADIENT} justifyContent="center">
        <HStack space="2" alignItems="center">
          {group?.imageFilename && <UrlPic file={group.imageFilename} size="9" border={1} invertedBorder />}
          <Text fontWeight="600" fontSize="14" color="white" isTruncated>
            {group?.title}
          </Text>
          <HStack flex="1" space="2" alignItems="center" justifyContent="flex-end">
            {sorting ? (
              <>
                <PressableButton onPressIn={drag}>
                  <ReorderIcon color="white" size="6" />
                </PressableButton>
              </>
            ) : (
              <>
                <GroupListCardMenuButton group={group} />
                <GroupListCardCollapseButton group={group} collapsed={collapsed} />
              </>
            )}
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default GroupListCardHeader;
