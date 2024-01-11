import useAxios from './useAxios';
import { useDispatch } from 'react-redux';
import { getStockSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';
import { fetchFail, fetchStart } from '../features/authSlice';

const useStockCalls = () => {
    const { axiosWithToken } = useAxios();
    const dispatch = useDispatch();

    const getStocks = async (url = "firms") => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken(`/${url}/`);
            const apiData = data.data;
            dispatch(getStockSuccess({ apiData, url }));
            toastSuccessNotify("İşlem başarılı oldu.");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("İşlem başarısız oldu.");
        }
    };

    const deleteStock = async (url = "firms", id) => {
        dispatch(fetchStart());
        try {
            await axiosWithToken.delete(`/${url}/${id}/`);
            await getStocks(url);
            toastSuccessNotify(`${url} bilgisi silinmiştir.`);
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("İşlem başarısız oldu.");
        }
    };

    const addStock = async (url, newData) => {
        dispatch(fetchStart());
        try {
            await axiosWithToken.post(`/${url}/`, newData);
            getStocks(url);
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("İşlem başarısız oldu.");
            console.log(error);
        }
    };


    const updateStock = async (url = "firms", id, data) => {
        dispatch(fetchStart());
        try {
            await axiosWithToken.put(`/${url}/${id}/`, data);
            toastSuccessNotify("Veri bilgisi güncellendi.")
            getStocks(url);
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("İşlem başarısız oldu.");
            console.log(error);
        }
    };

    return { getStocks, deleteStock, addStock, updateStock };
};

export default useStockCalls;
