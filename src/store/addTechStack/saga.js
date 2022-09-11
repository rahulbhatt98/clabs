import { takeEvery, put, call } from "redux-saga/effects"
import {
  GET_TECH_STACK,
  POST_TECH_STACK,
  DELETE_TECH_STACK,
} from "./actionTypes"

import {
  getTechStackSuccess,
  getTechStackFail,
  postTechStackSuccess,
  postTechStackFail,
  deleteTechStackFail,
  deleteTechStackSuccess,
} from "./action"

import {
  onGettechStack,
  onPosttechStack,
  onDeletetechStack,
} from "helpers/fakebackend_helper"
import { toast } from "../../utils/Toast"
function* onGetTechStack() {
  console.log("Clicked get teck stack")
  try {
    const response = yield call(onGettechStack)

    yield put(getTechStackSuccess(response.result))
  } catch (error) {
    yield put(getTechStackFail(error))
  }
}
function* onPostTechStack({ payload: message }) {
  console.log("Clicked get teck stack", message)
  try {
    const response = yield call(onPosttechStack,message)

    yield put(postTechStackSuccess(response))

      toast.success("Tech is added successfully.")

  } catch (error) {
    yield put(postTechStackFail(error))
  }
}
function* onDeleteTechStack({ payload: message }) {
  console.log("Clicked get teck stack")
  try {
    const response = yield call(onDeletetechStack,message)
console.log(response,"response")
    yield put(deleteTechStackSuccess(response))
    toast.success("Tech is deleted successfully.")
  } catch (error) {
    yield put(deleteTechStackFail(error))
  }
}
function* TechStackSaga() {
  yield takeEvery(GET_TECH_STACK, onGetTechStack)
  yield takeEvery(POST_TECH_STACK, onPostTechStack)
  yield takeEvery(DELETE_TECH_STACK, onDeleteTechStack)
}
export default TechStackSaga
