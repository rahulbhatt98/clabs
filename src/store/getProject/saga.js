import { takeEvery, put, call } from "redux-saga/effects"
import {GET_PROJECT } from "./actionTypes"

import { getProjectSuccess } from "./action"

import { onGetproject } from "helpers/fakebackend_helper"
function* onGetProject() {
  try {
    const response = yield call(onGetproject)
    yield put(getProjectSuccess(response))
  } catch (error) {
    yield put(getProjectFail(error))
  }
}
function* GetSaga() {
  yield takeEvery(GET_PROJECT, onGetProject)
}
export default GetSaga;
