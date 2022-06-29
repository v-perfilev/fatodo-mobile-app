import React, {useMemo} from 'react';
import {Box, Text} from 'native-base';
import {Group} from '../../../models/Group';
import {Theme} from 'native-base/src/theme';
import {LINEAR_GRADIENT, ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import PressableButton from '../../../components/controls/PressableButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import FHStack from '../../../components/boxes/FHStack';
import UrlPic from '../../../components/surfaces/UrlPic';

type UserViewGroupProps = {
  group: Group;
};

const UserViewGroup = ({group}: UserViewGroupProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (): void => navigation.navigate('GroupView', {group});

  const theme = useMemo<Theme>(() => ThemeFactory.getTheme(group.color), [group]);

  return (
    <ThemeProvider theme={theme}>
      <PressableButton onPress={goToGroupView}>
        <Box borderRadius="4" h="45px" pl="3" pr="2" bg={LINEAR_GRADIENT} justifyContent="center">
          <FHStack defaultSpace alignItems="center">
            {group?.imageFilename && <UrlPic file={group.imageFilename} size="9" border={1} invertedBorder />}
            <Text fontWeight="600" color="white" isTruncated>
              {group.title}
            </Text>
          </FHStack>
        </Box>
      </PressableButton>
    </ThemeProvider>
  );
};

export default UserViewGroup;
