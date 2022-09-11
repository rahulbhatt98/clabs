import { takeEvery, put, call } from "redux-saga/effects"
import { POST_RISK } from "./actionTypes"
import { toast } from "../../utils/Toast"
import { postRiskSuccess, postRiskFail } from "./action"

import { onPostRiskRegister } from "helpers/fakebackend_helper"
function* onPostRisk({ payload: sprint }) {
  try {
    const response = yield call(onPostRiskRegister, sprint)
    yield put(postRiskSuccess(response))
    toast.success("Risk is added succesfully")
  } catch (error) {
    yield put(postRiskFail(error))
    toast.error(error?.response?.message);
  }
}
function* RiskSaga() {
  yield takeEvery(POST_RISK, onPostRisk)
}
export default RiskSaga
