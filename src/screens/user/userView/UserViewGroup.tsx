import React, {memo} from 'react';
import {Box, Text} from 'native-base';
import {Group} from '../../../models/Group';
import {LINEAR_GRADIENT} from '../../../shared/themes/ThemeFactory';
import PressableButton from '../../../components/controls/PressableButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import FHStack from '../../../components/boxes/FHStack';
import UrlPic from '../../../components/surfaces/UrlPic';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import {flowRight} from 'lodash';

type UserViewGroupProps = {
  group: Group;
};

const UserViewGroup = ({group}: UserViewGroupProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (): void => navigation.navigate('GroupView', {group});

  return (
    <PressableButton onPress={goToGroupView}>
      <Box borderRadius="xl" h="45px" pl="3" pr="2" bg={LINEAR_GRADIENT} justifyContent="center">
        <FHStack space="3" alignItems="center">
          {group?.imageFilename && <UrlPic file={group.imageFilename} size="9" border={1} invertedBorder />}
          <Text fontWeight="600" color="white" isTruncated>
            {group.title}
          </Text>
        </FHStack>
      </Box>
    </PressableButton>
  );
};

export default flowRight(withThemeProvider, memo)(UserViewGroup);
