import React, {useMemo, useState} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withCommentsContainer, {WithCommentsProps} from '../../../shared/hocs/withContainers/withCommentsContainer';
import CommentsViewControl from './CommentsViewControl';
import CommentsViewContainer from './CommentsViewContainer';
import {Comment} from '../../../models/Comment';
import Header from '../../../components/layouts/Header';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';

type CommentsViewProps = WithCommentsProps;

const CommentsView = ({loading, colorScheme}: CommentsViewProps) => {
  const [reference, setReference] = useState<Comment>();

  const clearReference = (): void => {
    setReference(null);
  };

  const theme = useMemo<Theme>(() => {
    return colorScheme ? ThemeFactory.getTheme(colorScheme) : ThemeFactory.getDefaultTheme();
  }, [colorScheme]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading}>
        <CommentsViewContainer setReference={setReference} />
        <CommentsViewControl reference={reference} clearReference={clearReference} />
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withCommentsContainer(CommentsView);
