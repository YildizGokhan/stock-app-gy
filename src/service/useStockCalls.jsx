
import { firmsSuccess } from "../features/stockSlice"
import { useDispatch } from 'react-redux'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'
import useAxios from "./useAxios"
import { fetchStart, fetchFail } from "../features/authSlice"

const useStockCalls = () => {
    const dispatch = useDispatch()
    const { axiosWithToken } = useAxios()
    const getFirms = async () => {
        dispatch(fetchStart())
        try {
            const {data} = await axiosWithToken("/firms/")
            dispatch(firmsSuccess(data))
            toastSuccessNotify("Firma listesi alindi.")
            console.log(data);
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Firma listesi alinamadi.")
            console.log(error)
        }
    }
    return { getFirms }
}

export default useStockCalls