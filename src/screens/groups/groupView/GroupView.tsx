import React, {useMemo, useState} from 'react';
import {Theme} from 'native-base';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import GroupViewArchived from './GroupViewArchived';
import GroupViewActive from './GroupViewActive';

type GroupViewProps = WithGroupProps;

const GroupView = ({group, loading}: GroupViewProps) => {
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const theme = useMemo<Theme>(() => {
    return group ? ThemeFactory.getTheme(group?.color) : ThemeFactory.getDefaultTheme();
  }, [group]);

  return (
    <ThemeProvider theme={theme}>
      {showArchived ? (
        <GroupViewArchived loading={loading} showArchived={showArchived} setShowArchived={setShowArchived} />
      ) : (
        <GroupViewActive loading={loading} showArchived={showArchived} setShowArchived={setShowArchived} />
      )}
    </ThemeProvider>
  );
};

export default withGroupContainer(GroupView);
