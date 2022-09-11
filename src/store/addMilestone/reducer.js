import { POST_MILESTONE_FAIL, POST_MILESTONE_SUCCESS,GET_MILESTONE_SUCCESS,GET_MILESTONE_FAIL

  ,GET_MILESTONE_SUCCESS_BY_ID,GET_MILESTONE_FAIL_BY_ID
} from "./actionTypes"

const INIT_STATE = {
  milestone: [],
  getMilestone:[],
  messages: [],
  error: {},
  getMilestoneById:[]
  
}

const Milestone = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_MILESTONE_SUCCESS:
      return {
        ...state,
        milestone: action.payload,
      }

    case POST_MILESTONE_FAIL:
      return {
        ...state,
        error: action.payload,
      }


      case GET_MILESTONE_SUCCESS:
        return {
          ...state,
          getMilestone: action.payload,
        }
  
      case GET_MILESTONE_FAIL:
        return {
          ...state,
          error: action.payload,
        }
        

    default:
      return state
  }
}

export default Milestone
