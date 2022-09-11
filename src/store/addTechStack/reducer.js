import {
  GET_TECH_STACK_FAIL,
  GET_TECH_STACK_SUCCESS,
  POST_TECH_STACK_SUCCESS,
  POST_TECH_STACK_FAIL,
  DELETE_TECH_STACK_FAIL,
  DELETE_TECH_STACK_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  techStack: [],

  messages: [],
  error: {},
}

const TechStack = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TECH_STACK_SUCCESS:
      return {
        ...state,
        techStack: action.payload,
      }

    case GET_TECH_STACK_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case POST_TECH_STACK_SUCCESS:
      return {
        ...state,
        techStack: [...state,action.payload],
      }

    case POST_TECH_STACK_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case DELETE_TECH_STACK_SUCCESS:
      return {
        ...state,
        techStack: state.techStack.filter(
          techstack => techstack.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_TECH_STACK_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default TechStack
