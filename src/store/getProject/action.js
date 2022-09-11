import {
  GET_PROJECT,
  GET_PROJECT_FAIL,
  GET_PROJECT_SUCCESS,
} from "./actionTypes"

export const getProject = message => ({
  type: GET_PROJECT,
  payload: message,
})

export const getProjectSuccess = message => ({
  type:GET_PROJECT_SUCCESS ,
  payload: message?.result,
})

export const getProjectFail = error => ({
  type: GET_PROJECT_FAIL,
  payload: error,
})
GET_PROJECT_FAIL