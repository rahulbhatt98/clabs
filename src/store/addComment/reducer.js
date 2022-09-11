import { POST_COMMENT_FAIL, POST_COMMENT_SUCCESS,
  GET_COMMENT_FAIL, GET_COMMENT_SUCCESS, COMMENT_LIKE_SUCCESS, COMMENT_LIKE_FAIL } from "./actionTypes"

const INIT_STATE = {
  Comment: [],
  messages: [],
  getComment:[],
  commentLike:[],
  error: {},
}

const Comment = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        Comment: action.payload,
      }

    case POST_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      case GET_COMMENT_SUCCESS:
        return {
          ...state,
          getComment:action.payload,

        }
  
      case GET_COMMENT_FAIL:
        return {
          ...state,
          error: action.payload,
        }

        case COMMENT_LIKE_SUCCESS:
          return {
            ...state,
            commentLike: [...state.commentLike, action.payload],
              
          }
    
        case COMMENT_LIKE_FAIL:
          return {
            ...state,
            error: action.payload,
          }
    default:
      return state
  }
}

export default Comment;
