import { POST_RISK_FAIL, POST_RISK_SUCCESS } from "./actionTypes"

const INIT_STATE = {
  riskRegister: [],
  messages: [],
  error: {},
}

const RiskRegister = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_RISK_SUCCESS:
      return {
        ...state,
        riskRegister: action.payload,
      }

    case POST_RISK_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default RiskRegister
