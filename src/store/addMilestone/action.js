import {
  POST_MILESTONE,
  POST_MILESTONE_FAIL,
  POST_MILESTONE_SUCCESS,
  GET_MILESTONE,
  GET_MILESTONE_FAIL,
  GET_MILESTONE_SUCCESS,
  GET_MILESTONE_BY_ID,
  GET_MILESTONE_SUCCESS_BY_ID,
  GET_MILESTONE_FAIL_BY_ID
} from "./actionTypes"

export const postMilestone = message => ({
  type: POST_MILESTONE,
  payload: message,
})

export const postMilestoneSuccess = message => ({
  type: POST_MILESTONE_SUCCESS,
  payload: message,
})

export const postMiletoneFail = error => ({
  type: POST_MILESTONE_FAIL,
  payload: error,
})

export const getMilestone = message => ({
  type: GET_MILESTONE,
  payload: message,
})

export const getMilestoneSuccess = message => ({
  type: GET_MILESTONE_SUCCESS,
  payload: message,
})

export const getMiletoneFail = error => ({
  type: GET_MILESTONE_FAIL,
  payload: error,
})
