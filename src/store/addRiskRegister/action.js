import {
  POST_RISK,
  POST_RISK_FAIL,
  POST_RISK_SUCCESS,
} from "./actionTypes"

export const postRisk = message => ({
  type: POST_RISK,
  payload: message,
})

export const postRiskSuccess = message => ({
  type: POST_RISK_SUCCESS,
  payload: message,
})

export const postRiskFail = error => ({
  type: POST_RISK_FAIL,
  payload: error,
})
