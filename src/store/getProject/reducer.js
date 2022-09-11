import { GET_PROJECT_FAIL, GET_PROJECT_SUCCESS } from "./actionTypes"

const INIT_STATE = {
  getProject: [],
  messages: [],
  error: {},
}

const GetProject = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        getProject: action.payload,
      }

    case GET_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default GetProject;
