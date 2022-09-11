import {
  GET_TECH_STACK,
  GET_TECH_STACK_FAIL,
  GET_TECH_STACK_SUCCESS,
  POST_TECH_STACK,
  POST_TECH_STACK_SUCCESS,
  POST_TECH_STACK_FAIL,
  DELETE_TECH_STACK,
  DELETE_TECH_STACK_SUCCESS,
  DELETE_TECH_STACK_FAIL,
} from "./actionTypes"

export const getTechStack = message => ({
  type: GET_TECH_STACK,
  payload: message,
})

export const getTechStackSuccess = message => ({
  type: GET_TECH_STACK_SUCCESS,
  payload: message,
})

export const getTechStackFail = error => ({
  type: GET_TECH_STACK_FAIL,
  payload: error,
})

export const postTechStack = message => ({
  type: POST_TECH_STACK,
  payload: message,
})

export const postTechStackSuccess = message => ({
  type: POST_TECH_STACK_SUCCESS,
  payload: message,
})

export const postTechStackFail = error => ({
  type: POST_TECH_STACK_FAIL,
  payload: error,
})
export const deleteTechStack = message => ({
  type: DELETE_TECH_STACK,
  payload: message,
})

export const deleteTechStackSuccess = message => ({
  type: DELETE_TECH_STACK_SUCCESS,
  payload: message,
})

export const deleteTechStackFail = error => ({
  type: DELETE_TECH_STACK_FAIL,
  payload: error,
})
