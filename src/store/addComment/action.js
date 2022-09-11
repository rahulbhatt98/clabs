import {
  POST_COMMENT,
  POST_COMMENT_FAIL,
  POST_COMMENT_SUCCESS,
  GET_COMMENT,
  GET_COMMENT_FAIL,
  GET_COMMENT_SUCCESS,
  COMMENT_LIKE,
  COMMENT_LIKE_FAIL,
  COMMENT_LIKE_SUCCESS,
} from "./actionTypes"

export const postComment = message => ({
  type: POST_COMMENT,
  payload: message,
})

export const postCommentSuccess = message => ({
  type: POST_COMMENT_SUCCESS,
  payload: message,
})

export const postCommentFail = error => ({
  type: POST_COMMENT_FAIL,
  payload: error,
})


export const getComment = message => ({
  type: GET_COMMENT,
  payload: message,
})

export const getCommentSuccess = message => ({
  type: GET_COMMENT_SUCCESS,
  payload: message,
})

export const getCommentFail = error => ({
  type: GET_COMMENT_FAIL,
  payload: error,
})

export const CommentLike = message => ({
  type: COMMENT_LIKE,
  payload: message,
})

export const CommentLikeSuccess = message => ({
  type: COMMENT_LIKE_SUCCESS,
  payload: message,
})

export const CommentLikeFail = error => ({
  type: COMMENT_LIKE_FAIL,
  payload: error,
})