import { takeEvery, put, call } from "redux-saga/effects"
import { COMMENT_LIKE, GET_COMMENT, POST_COMMENT} from "./actionTypes"
import { postCommentSuccess, postCommentFail, getCommentSuccess, getCommentFail, CommentLikeSuccess, CommentLikeFail } from "./action"
import { onPostcomment,ongetComment,commentLike } from "helpers/fakebackend_helper"
import { toast } from "../../utils/Toast"

function* onPostComment({ payload: Comment }) {
  try {
    const response = yield call(onPostcomment, Comment)
    console.log(Comment,"re")
    yield put(postCommentSuccess(response))
    toast.success("Comment is added successfully")
  } catch (error) {
    yield put(postCommentFail(error))
    toast.error(error?.response?.message);
  }
}

function* onGetComment() {
  
  try {
    const response = yield call(ongetComment)
  console.log(response,"saga")
    yield put(getCommentSuccess(response?.result))
  } catch (error) {
    yield put(getCommentFail(error))
  }
}


function* CommentLike({payload:comment}) {
  
  try {
    const response = yield call(commentLike,comment)
  console.log(comment,"comment")
    yield put(CommentLikeSuccess(response))
  } catch (error) {
    yield put(CommentLikeFail(error))
  }
}
function* CommentSaga() {
  yield takeEvery(GET_COMMENT, onGetComment)
  yield takeEvery(POST_COMMENT, onPostComment)
  yield takeEvery(COMMENT_LIKE, CommentLike)
}
export default CommentSaga
