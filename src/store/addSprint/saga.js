import { takeEvery, put, call } from "redux-saga/effects"
import { POST_SPRINT, LIST_SPRINT } from "./actionTypes"
import { toast } from "../../utils/Toast"
import {
  postSprintSuccess,
  postSprintFail,
  listSprintSuccess,
  listSprintFail,
} from "./action"

import { onPostsprint, onListsprint } from "helpers/fakebackend_helper"
function* onPostSprint({ payload: sprint }) {
  try {
    const response = yield call(onPostsprint, sprint)
    yield put(postSprintSuccess(response))
    toast.success("Sprint is added successfully.")
  } catch (error) {
    yield put(postSprintFail(error))
  }
}
function* onListSprint() {
  try {
    const response = yield call(onListsprint)
    console.log("response", response)
    yield put(listSprintSuccess(response))
  } catch (error) {
    console.log("response", error)
    yield put(listSprintFail(error))
  }
}
function* SprintSaga() {
  yield takeEvery(POST_SPRINT, onPostSprint)
  yield takeEvery(LIST_SPRINT, onListSprint)
}
export default SprintSaga
