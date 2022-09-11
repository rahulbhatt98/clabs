import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
const API_URL = "https://stgphys.appsndevs.com/labmatrics/api/"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url) {
  console.log(url, "url")
  const tokenCheck = JSON.parse(localStorage.getItem("authUser"))?.access_token
  console.log(tokenCheck, "url1")
  const config = {
    headers: { Authorization: `Bearer ${tokenCheck}` },
  }
  console.log(url, "url2")
  if (tokenCheck) {
    console.log("without token")
    return await axiosApi.get(url, config).then(response => response.data)
  } else {
    console.log("with token")
    return await axiosApi.get(url).then(response => response.data)
  }
}

export async function post(url, data) {
  const tokenCheck = JSON.parse(localStorage.getItem("authUser"))?.access_token
  const config = {
    headers: { Authorization: `Bearer ${tokenCheck}` },
  }

  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data) {
  const tokenCheck = JSON.parse(localStorage.getItem("authUser"))?.access_token
  const config = {
    headers: { Authorization: `Bearer ${tokenCheck}` },
  }

  return await axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, id) {
  const tokenCheck = JSON.parse(localStorage.getItem("authUser"))?.access_token
  const config = {
    headers: { Authorization: `Bearer ${tokenCheck}` },
  }
  return await axiosApi
    .get(url + `/${id}`, { ...config })
    .then(response => response.data)
}
