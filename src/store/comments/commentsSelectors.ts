import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const getCommentsState = (state: RootState) => state.comments;

class CommentsSelectors {
  static targetId = createSelector(getCommentsState, (state) => state.targetId);

  static comments = createSelector(getCommentsState, (state) => state.comments);

  static loading = createSelector(getCommentsState, (state) => state.loading);

  static allLoaded = createSelector(getCommentsState, (state) => state.allLoaded);
}

export default CommentsSelectors;
