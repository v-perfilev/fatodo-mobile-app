import {UserAccount} from '../../../../models/User';
import React, {FC} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {Box, HStack, Pressable, Text} from 'native-base';
import UrlPic from '../../../../components/surfaces/UrlPic';
import GroupListCardCollapseButton from './GroupListCardCollapseButton';
import GroupListCardMenuButton from './GroupListCardMenuButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';

type Props = {
  account: UserAccount;
  sorting: boolean;
  drag: () => void;
};

const GroupListCardHeader: FC<Props> = ({account, sorting, drag}: Props) => {
  const {group} = useGroupViewContext();
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (): void => {
    navigation.navigate('GroupView');
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
      <Box h="45px" px="2" bg={linearGradient} justifyContent="center">
        <HStack space="2" alignItems="center">
          {group.imageFilename && <UrlPic url={group.imageFilename} size="9" border={1} invertedBorder />}
          <Text fontWeight="600" fontSize="14" color="white">
            {group.title}
          </Text>
          <HStack flex="1" space="2" alignItems="center" justifyContent="flex-end">
            <GroupListCardMenuButton />
            <GroupListCardCollapseButton />
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default GroupListCardHeader;
