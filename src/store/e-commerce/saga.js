import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_CART_DATA,
  GET_CUSTOMERS,
  GET_ORDERS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS,
  GET_SHOPS,
  ADD_NEW_ORDER,
  ADD_NEW_MILESTONE,
  DELETE_ORDER,
  UPDATE_ORDER,
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_PRODUCT_COMMENTS,
  ON_LIKE_COMMENT,
  ON_LIKE_REPLY,
  ON_ADD_REPLY,
  ON_ADD_COMMENT,
} from "./actionTypes"
import {
  getCartDataFail,
  getCartDataSuccess,
  getCustomersFail,
  getCustomersSuccess,
  getOrdersFail,
  getOrdersSuccess,
  getProductDetailFail,
  getProductDetailSuccess,
  getProductsFail,
  getProductsSuccess,
  getShopsFail,
  getShopsSuccess,
  addOrderFail,
  addOrderSuccess,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
  addCustomerFail,
  addCustomerSuccess,
  updateCustomerSuccess,
  updateCustomerFail,
  deleteCustomerSuccess,
  deleteCustomerFail,
  getProductCommentsSuccess,
  getProductCommentsFail,
  onLikeCommentSuccess,
  onLikeCommentFail,
  onLikeReplySuccess,
  onLikeReplyFail,
  onAddReplySuccess,
  onAddReplyFail,
  onAddCommentSuccess,
  onAddCommentFail,
  addmilestoneSuccess,
  addmilestoneFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCartData,
  getCustomers,
  getOrders,
  getProducts,
  getShops,
  getProductDetail,
  addNewOrder,
  addNewMilestone,
  updateOrder,
  deleteOrder,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getProductComents as getProductComentsApi,
  onLikeComment as onLikeCommentApi,
  onLikeReply as onLikeReplyApi,
  onAddReply as onAddReplyApi,
  onAddComment as onAddCommentApi,
} from "helpers/fakebackend_helper"

import { toast } from "../../utils/Toast"


function* fetchProducts() {
  try {
    const response = yield call(getProducts)
    yield put(getProductsSuccess(response))
  } catch (error) {
    yield put(getProductsFail(error))
  }
}

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(getProductDetail, productId)
    yield put(getProductDetailSuccess(response))
  } catch (error) {
    yield put(getProductDetailFail(error))
  }
}

function* fetchOrders() {
  try {
    console.log("Get order hit1")
    const response = yield call(getOrders)
    // console.log("get orderes Clicked", response.result)
    yield put(getOrdersSuccess(response.result))
  } catch (error) {
    yield put(getOrdersFail(error))
  }
}

function* fetchCartData() {
  try {
    const response = yield call(getCartData)
    yield put(getCartDataSuccess(response))
  } catch (error) {
    yield put(getCartDataFail(error))
  }
}

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers)
    yield put(getCustomersSuccess(response))
  } catch (error) {
    yield put(getCustomersFail(error))
  }
}

function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(updateCustomer, customer)
    yield put(updateCustomerSuccess(response))
  } catch (error) {
    yield put(updateCustomerFail(error))
  }
}

function* onDeleteCustomer({ payload: customer }) {
  try {
    const response = yield call(deleteCustomer, customer)
    yield put(deleteCustomerSuccess(response))
  } catch (error) {
    yield put(deleteCustomerFail(error))
  }
}

function* onAddNewCustomer({ payload: customer }) {
  try {
    const response = yield call(addNewCustomer, customer)

    yield put(addCustomerSuccess(response))
  } catch (error) {
    yield put(addCustomerFail(error))
  }
}

function* fetchShops() {
  try {
    const response = yield call(getShops)
    yield put(getShopsSuccess(response))
  } catch (error) {
    yield put(getShopsFail(error))
  }
}

function* onUpdateOrder({ payload: order }) {
  try {
    const response = yield call(updateOrder, order)
    yield put(updateOrderSuccess(response))
  } catch (error) {
    yield put(updateOrderFail(error))
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order)
    if (response.message == "success") {
      console.log("success", order.id)
      yield put(deleteOrderSuccess(order.id))
      toast.success("Project is deleted successfully.")
    }
  } catch (error) {
    console.log("error", error)
    yield put(deleteOrderFail(error))
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    console.log(order, "onAddNewOrder1")
    const response = yield call(addNewOrder, order)
    // console.log(response, "onAddNewOrder response")
    yield put(addOrderSuccess(response))
    if(order.id == ""){toast.success("Project is added successfully.")}
    else{toast.success("Project is updated successfully.")}
  } catch (error) {
    yield put(addOrderFail(error))
    toast.error(error?.response?.message);
  }
}
function* onAddNewMilestone({ payload: milestone }) {
  try {
    console.log(milestone, "onAddNewOrder1")
    const response = yield call(addNewMilestone, milestone)
    console.log(response, "onAddNewOrder response")
    yield put(addmilestoneSuccess(response))
  } catch (error) {
    yield put(addmilestoneFail(error))
  }
}

function* getProductComents() {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(getProductComentsApi)
    yield put(getProductCommentsSuccess(response))
  } catch (error) {
    yield put(getProductCommentsFail(error))
  }
}

function* onLikeComment({ payload: { commentId, productId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeCommentApi, commentId, productId)
    yield put(onLikeCommentSuccess(response))
  } catch (error) {
    yield put(onLikeCommentFail(error))
  }
}

function* onLikeReply({ payload: { commentId, productId, replyId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeReplyApi, commentId, productId, replyId)
    yield put(onLikeReplySuccess(response))
  } catch (error) {
    yield put(onLikeReplyFail(error))
  }
}

function* onAddReply({ payload: { commentId, productId, replyText } }) {
  try {
    const response = yield call(onAddReplyApi, commentId, productId, replyText)
    yield put(onAddReplySuccess(response))
  } catch (error) {
    yield put(onAddReplyFail(error))
  }
}

function* onAddComment({ payload: { productId, commentText } }) {
  try {
    const response = yield call(onAddCommentApi, productId, commentText)
    yield put(onAddCommentSuccess(response))
  } catch (error) {
    yield put(onAddCommentFail(error))
  }
}

function* ecommerceSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts)
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail)
  yield takeEvery(GET_ORDERS, fetchOrders)
  yield takeEvery(GET_CART_DATA, fetchCartData)
  yield takeEvery(GET_CUSTOMERS, fetchCustomers)
  yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer)
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer)
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer)
  yield takeEvery(GET_SHOPS, fetchShops)
  yield takeEvery(ADD_NEW_ORDER, onAddNewOrder)
  yield takeEvery(ADD_NEW_MILESTONE, onAddNewMilestone)
  yield takeEvery(UPDATE_ORDER, onUpdateOrder)
  yield takeEvery(DELETE_ORDER, onDeleteOrder)
  yield takeEvery(GET_PRODUCT_COMMENTS, getProductComents)
  yield takeEvery(ON_LIKE_COMMENT, onLikeComment)
  yield takeEvery(ON_LIKE_REPLY, onLikeReply)
  yield takeEvery(ON_ADD_REPLY, onAddReply)
  yield takeEvery(ON_ADD_COMMENT, onAddComment)
}

export default ecommerceSaga
