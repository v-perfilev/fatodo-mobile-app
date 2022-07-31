import React, {useEffect, useMemo, useState} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withCommentsContainer, {WithCommentsProps} from '../../../shared/hocs/withContainers/withCommentsContainer';
import {Comment} from '../../../models/Comment';
import Header from '../../../components/layouts/Header';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import CommentListContainer from './CommentListContainer';
import CommentListControl from './CommentListControl';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch} from '../../../store/store';
import {CommentsThunks} from '../../../store/comments/commentsActions';

type CommentListProps = WithCommentsProps;

const CommentList = ({targetId, loading, colorScheme}: CommentListProps) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const [reference, setReference] = useState<Comment>();

  const clearReference = (): void => {
    setReference(null);
  };

  useEffect(() => {
    isFocused && !loading && dispatch(CommentsThunks.refreshComments(targetId));
  }, [isFocused, loading]);

  const theme = useMemo<Theme>(() => {
    return colorScheme ? ThemeFactory.getTheme(colorScheme) : ThemeFactory.getDefaultTheme();
  }, [colorScheme]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading}>
        <CommentListContainer setReference={setReference} />
      </ConditionalSpinner>
      <CommentListControl reference={reference} clearReference={clearReference} />
    </ThemeProvider>
  );
};

export default withCommentsContainer(CommentList);
