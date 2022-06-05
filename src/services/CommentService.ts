import {AxiosPromise} from 'axios';
import {PageableList} from '../models/PageableList';
import {Comment} from '../models/Comment';
import {CommentDTO} from '../models/dto/CommentDTO';
import axios, {axiosIgnore404} from '../shared/axios';

export default class CommentService {
  private static baseUrl = '/api/comment';

  /*
    CommentController
   */
  public static getAllPageable = (
    targetId: string,
    offset?: number,
    size?: number,
  ): AxiosPromise<PageableList<Comment>> => {
    const url = CommentService.baseUrl + '/comments/' + targetId;
    const params = {offset, size};
    return axiosIgnore404.get(url, {params});
  };

  public static addComment = (targetId: string, dto: CommentDTO): AxiosPromise<Comment> => {
    const url = CommentService.baseUrl + '/comments/' + targetId;
    return axios.post(url, dto);
  };

  public static editComment = (commentId: string, dto: CommentDTO): AxiosPromise<Comment> => {
    const url = CommentService.baseUrl + '/comments/' + commentId;
    return axios.put(url, dto);
  };

  public static deleteComment = (commentId: string): AxiosPromise<void> => {
    const url = CommentService.baseUrl + '/comments/' + commentId;
    return axios.delete(url);
  };

  /*
    ReactionController
   */
  public static likeCommentReaction = (commentId: string): AxiosPromise<void> => {
    const url = CommentService.baseUrl + '/reactions/like/' + commentId;
    return axios.get(url);
  };

  public static dislikeCommentReaction = (commentId: string): AxiosPromise<void> => {
    const url = CommentService.baseUrl + '/reactions/dislike/' + commentId;
    return axios.get(url);
  };

  public static noneCommentReaction = (commentId: string): AxiosPromise<void> => {
    const url = CommentService.baseUrl + '/reactions/none/' + commentId;
    return axios.get(url);
  };
}
