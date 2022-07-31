import {AxiosPromise} from 'axios';
import {PageableList} from '../models/PageableList';
import {Comment, CommentInfo, CommentThreadInfo} from '../models/Comment';
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
    const url = CommentService.baseUrl + '/comment/' + targetId;
    const params = {offset, size};
    return axiosIgnore404.get(url, {params});
  };

  public static addComment = (targetId: string, dto: CommentDTO): AxiosPromise<Comment> => {
    const url = CommentService.baseUrl + '/comment/' + targetId;
    return axios.post(url, dto);
  };

  public static editComment = (commentId: string, dto: CommentDTO): AxiosPromise<Comment> => {
    const url = CommentService.baseUrl + '/comment/' + commentId;
    return axios.put(url, dto);
  };

  public static deleteComment = (commentId: string): AxiosPromise<void> => {
    const url = CommentService.baseUrl + '/comment/' + commentId;
    return axios.delete(url);
  };

  /*
  ReactionController
   */
  public static likeCommentReaction = (commentId: string): AxiosPromise<void> => {
    const url = CommentService.baseUrl + '/reaction/' + commentId + '/like';
    return axios.post(url);
  };

  public static dislikeCommentReaction = (commentId: string): AxiosPromise<void> => {
    const url = CommentService.baseUrl + '/reaction/' + commentId + '/dislike';
    return axios.post(url);
  };

  public static noneCommentReaction = (commentId: string): AxiosPromise<void> => {
    const url = CommentService.baseUrl + '/reaction/' + commentId;
    return axios.delete(url);
  };

  /*
  InfoController
   */
  public static getCommentInfoByIds = (ids: string[]): AxiosPromise<CommentInfo[]> => {
    const url = CommentService.baseUrl + '/info/comment';
    const params = {ids};
    return axios.get(url, {params});
  };

  public static getThreadInfoByTargetIds = (targetIds: string[]): AxiosPromise<CommentThreadInfo[]> => {
    const url = CommentService.baseUrl + '/info/thread';
    const params = {ids: targetIds};
    return axios.get(url, {params});
  };

  public static refreshThread = (targetId: string): AxiosPromise<void> => {
    const url = CommentService.baseUrl + '/info/thread/' + targetId + '/refresh';
    return axios.put(url);
  };
}
