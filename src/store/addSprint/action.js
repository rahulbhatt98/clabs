import {
  POST_SPRINT,
  POST_SPRINT_FAIL,
  POST_SPRINT_SUCCESS,
  LIST_SPRINT,
  LIST_SPRINT_SUCCESS,
  LIST_SPRINT_FAIL,
} from "./actionTypes"

export const postSprint = message => ({
  type: POST_SPRINT,
  payload: message,
})

export const postSprintSuccess = message => ({
  type: POST_SPRINT_SUCCESS,
  payload: message,
})

export const postSprintFail = error => ({
  type: POST_SPRINT_FAIL,
  payload: error,
})
export const listSprint = message => ({
  type: LIST_SPRINT,
  payload: message,
})

export const listSprintSuccess = message => ({
  type: LIST_SPRINT_SUCCESS,
  payload: message,
})

export const listSprintFail = error => ({
  type: LIST_SPRINT_FAIL,
  payload: error,
})
