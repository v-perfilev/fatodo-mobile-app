import React, {useMemo, useState} from 'react';
import {Theme} from 'native-base';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import GroupViewHeader from './GroupViewHeader';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import GroupViewActiveItems from './groupViewItems/GroupViewActiveItems';
import GroupViewArchivedItems from './groupViewItems/GroupViewArchivedItems';
import GroupViewCorner from './GroupViewCorner';

type GroupViewProps = WithGroupProps;

const GroupView = ({group, loading}: GroupViewProps) => {
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const theme = useMemo<Theme>(() => {
    return group ? ThemeFactory.getTheme(group?.color) : ThemeFactory.getDefaultTheme();
  }, [group]);

  return (
    <ThemeProvider theme={theme}>
      <GroupViewHeader showArchived={showArchived} setShowArchived={setShowArchived} />
      <GroupViewCorner />
      <ConditionalSpinner loading={loading}>
        {showArchived ? <GroupViewArchivedItems /> : <GroupViewActiveItems />}
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withGroupContainer(GroupView);
