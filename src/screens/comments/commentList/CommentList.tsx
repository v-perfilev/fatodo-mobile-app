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
import {useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';

type CommentListProps = WithCommentsProps;

const CommentList = ({loading: initialLoading, colorScheme}: CommentListProps) => {
  const loading = useAppSelector(CommentsSelectors.loading);
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
      <ConditionalSpinner loading={loading || initialLoading}>
        <CommentListContainer setReference={setReference} />
      </ConditionalSpinner>
      <CommentListControl reference={reference} clearReference={clearReference} />
    </ThemeProvider>
  );
};

export default withCommentsContainer(CommentList);
