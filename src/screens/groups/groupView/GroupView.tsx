import React, {useMemo, useState} from 'react';
import {Divider, Theme} from 'native-base';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import GroupViewUsers from './GroupViewUsers';
import GroupViewItems from './groupViewItems/GroupViewItems';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import GroupViewHeader from './GroupViewHeader';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';

type GroupViewProps = WithGroupProps;

const GroupView = ({group, loading}: GroupViewProps) => {
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const theme = useMemo<Theme>(() => {
    return group ? ThemeFactory.getTheme(group?.color) : ThemeFactory.getDefaultTheme();
  }, [group]);

  return (
    <ThemeProvider theme={theme}>
      <GroupViewHeader />
      <ConditionalSpinner loading={loading}>
        <FScrollView>
          <FVStack defaultSpace>
            <GroupViewUsers />
            <Divider bg="secondary.500" />
            <GroupViewItems showArchived={showArchived} setShowArchived={setShowArchived} />
          </FVStack>
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withGroupContainer(GroupView);
