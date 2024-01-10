
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { useNavigate } from "react-router-dom"
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess } from "../features/authSlice"
import { useDispatch } from "react-redux"
import useAxios from "./useAxios"


const useAuthCalls = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { axiosWithToken, axiosPublic } = useAxios()

  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic.post("/auth/login/", userInfo)
      dispatch(loginSuccess(data))
      toastSuccessNotify("Login işlemi basarili.")
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Login işlemi başarisiz oldu.")
      console.log(error)
    }
  }

  const register = async (registerInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic.post("/users/", registerInfo)
      dispatch(registerSuccess(data))
      toastSuccessNotify("Register işlemi basarili.")
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail(error))
      toastErrorNotify("Register işlemi başarisiz oldu.")
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      await axiosWithToken("/auth/logout/")
      dispatch(logoutSuccess())
      toastSuccessNotify("Logout işlemi basarili.")
      navigate("/")
    } catch (error) {
      toastErrorNotify("Logout işlemi başarisiz oldu.")
      console.log(error);
    }
  }

  return { login, register, logout }
}

export default useAuthCalls
