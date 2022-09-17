import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Comment} from '../../models/Comment';

const getCommentsState = (state: RootState) => state.comments;

class CommentsSelectors {
  static targetId = createSelector(getCommentsState, (state) => state.targetId as string);

  static comments = createSelector(getCommentsState, (state) => state.comments as Comment[]);

  static allLoaded = createSelector(getCommentsState, (state) => state.allLoaded as boolean);
}

export default CommentsSelectors;
