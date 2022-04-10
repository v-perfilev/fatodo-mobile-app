import React, {FC, memo} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {Box, HStack, Pressable, Text} from 'native-base';
import GroupListCardCollapseButton from './GroupListCardCollapseButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {flowRight} from 'lodash';
import UrlPic from '../../../../components/surfaces/UrlPic';
import GroupListCardMenuButton from './GroupListCardMenuButton';
import PressableButton from '../../../../components/controls/PressableButton';
import ReorderIcon from '../../../../components/icons/ReorderIcon';

type GroupListCardHeaderProps = {
  sorting: boolean;
  drag: () => void;
};

const GroupListCardHeader: FC<GroupListCardHeaderProps> = ({sorting, drag}) => {
  const {group} = useGroupViewContext();
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (): void => {
    navigation.navigate('GroupView', {groupId: group.id});
  };

  const linearGradient = {
    linearGradient: {
      colors: ['primary.500', 'primary.300'],
      start: [0, 0],
      end: [1, 1],
    },
  };

  return (
    <Pressable onPress={goToGroupView}>
      <Box h="45" px="2" bg={linearGradient} justifyContent="center">
        <HStack space="2" alignItems="center">
          {group.imageFilename && <UrlPic url={group.imageFilename} size="9" border={1} invertedBorder />}
          <Text fontWeight="600" fontSize="14" color="white" isTruncated>
            {group.title}
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
                <GroupListCardMenuButton />
                <GroupListCardCollapseButton />
              </>
            )}
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default flowRight([memo])(GroupListCardHeader);
