import React, {useMemo, useState} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withCommentsContainer, {WithCommentsProps} from '../../../shared/hocs/withContainers/withCommentsContainer';
import {Comment} from '../../../models/Comment';
import Header from '../../../components/layouts/Header';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import CommentListContainer from './CommentListContainer';
import CommentListControl from './CommentListControl';

type CommentListProps = WithCommentsProps;

const CommentList = ({loading, colorScheme}: CommentListProps) => {
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
        <CommentListContainer setReference={setReference} />
        <CommentListControl reference={reference} clearReference={clearReference} />
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withCommentsContainer(CommentList);