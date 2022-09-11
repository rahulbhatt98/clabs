import { takeEvery, put, call } from "redux-saga/effects"
import {
  POST_MILESTONE,
  GET_MILESTONE,
  GET_MILESTONE_BY_ID,
} from "./actionTypes"

import {
  postMilestoneSuccess,
  postMiletoneFail,
  getMilestoneSuccess,
  getMiletoneFail,
  getMilestoneSuccessById,
  getMiletoneFailById,
} from "./action"
import { toast } from "../../utils/Toast"
import { onPostMileStone, onGetmileStoneById } from "helpers/fakebackend_helper"

function* onPostMilestone({ payload: milestone }) {
  console.log(milestone, "check mile")
  try {
    const response = yield call(onPostMileStone, milestone)
    yield put(postMilestoneSuccess(response))
    toast.success("Milestone is added successfully.")
  } catch (error) {
    yield put(postMiletoneFail(error))
  }
}

function* onGetMilestone({ payload: id }) {
  try {
    const response = yield call(onGetmileStoneById, id)
    yield put(getMilestoneSuccess(response))
  } catch (error) {
    yield put(getMiletoneFail(error))
  }
}
// function* onGetMilestoneById({payload:id}) {
//   // console.log(milestone, "check mile")
//   try {
//     const response = yield call(onGetmileStoneById,id)
//     yield put(getMilestoneSuccessById(response))
//   } catch (error) {
//     yield put(getMiletoneFailById(error))
//   }
// }
function* MilestoneSaga() {
  yield takeEvery(POST_MILESTONE, onPostMilestone)
  yield takeEvery(GET_MILESTONE, onGetMilestone)
  // yield takeEvery(GET_MILESTONE_BY_ID, onGetMilestoneById)
}
export default MilestoneSaga
