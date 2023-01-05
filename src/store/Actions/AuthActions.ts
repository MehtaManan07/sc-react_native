import * as types from '../types';
import axios from '../../constants/api';
const url = `/api/v1/users`;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
const returnToken = async () => {
  const token = await AsyncStorage.getItem('verseJWTtoken');
  return token;
};

export const getUsernames = (u: any) => async (dispatch: any) => {
  try {
    const {data} = await axios.get(`${url}?select=username`);
    const usernames: any = [];
    // @ts-ignore
    data.data.map((each: any) => {
      if(each.username !== u){
        usernames.push(each.username)
      }
    });
    dispatch({type: types.GET_USERNAMES, payload: usernames});
  } catch (error) {
    console.log({error});
    // const displayErr = error.response.data.error.split(',')[0];
    // @ts-ignore
    dispatch({type: types.USERNAMES_FAIL, payload: error?.respnse});
  }
};

export const getPhoneNums = () => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`${url}?select=phone`);
    const nums: any = [];
    // @ts-ignore
    data.data.map((each: any) => nums.push(each.phone));
    dispatch({type: types.GET_PHONE_NUMS, payload: nums});
  } catch (error) {
    console.log({error});
    // const displayErr = error.response.data.error.split(',')[0];
    // @ts-ignore
    dispatch({type: types.PHONE_NUMS_FAIL, payload: error?.respnse});
  }
};

export const sendOTP = (phone: string) => async (dispatch: any) => {
  dispatch({type: types.GET_OTP_LOADING});
  try {
    const {data} = await axios.get(`${url}/sendOTP/${phone}`);
    dispatch({type: types.GET_OTP_SUCCESS, payload: data});
  } catch (error) {
    console.log({error});
    // const displayErr = error.response.data.error.split(',')[0];
    // @ts-ignore
    dispatch({type: types.GET_OTP_FAIL, payload: error?.respnse});
  }
};

export const loginuser =
  (values: any, navigate: null | any) => async (dispatch: any) => {
    dispatch({type: types.AUTH_LOADING});
    try {
      const {data} = await axios.post(`${url}/signup`, values);
      dispatch({type: types.AUTH_SUCCESS, payload: data});
      if (data.data) {
        navigate('Home');
      }
    } catch (error) {
      console.log({error});
      // @ts-ignore
      const displayErr = error.response.data.error.split(',')[0];
      dispatch({type: types.AUTH_FAIL, payload: displayErr});
    }
  };

export const updateuser = (values: any, id: any, show: Boolean = true) => async (dispatch: any) => {
  dispatch({type: types.AUTH_LOADING});
  try {
    const token = await returnToken();
    const {data} = await axios.put(`${url}/${id}`, values, {
      headers: {Authorization: `Bearer ${token}`},
    });
    if(show){
      showMessage({ message: 'Profile Updated Successfully', type: 'success' })
    }
    dispatch({type: types.UPDATE_PROFILE_SUCCESS, payload: {user: data.data}});
  } catch (error) {
    console.log({error});
    // @ts-ignore
    // const displayErr = error.response.data.error.split(',')[0];
    dispatch({type: types.UPDATE_PROFILE_FAIL, payload: 'displayErr'});
  }
};

export const getMe =
  (navigate: null | any, token: string) => async (dispatch: any) => {
    dispatch({type: types.AUTH_LOADING});
    try {
      console.log('hey')
      const {data, status} = await axios.get(`${url}/me`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log('he2')
      dispatch({
        type: types.GET_ME_SUCCESS,
        // @ts-ignore
        payload: {user: data.data, token},
      });
    } catch (error) {
      // const displayErr = error.response.data.error.split(',')[0];
      dispatch({
        type: types.GET_ME_FAIL,
        // @ts-ignore
        payload: error.respnse.data.error,
      });
    }
  };

export const logoutUser = (navigate: null | any) => async (dispatch: any) => {
  dispatch({type: types.AUTH_LOADING});
  try {
    const {data, status} = await axios.get(`${url}/logout`);
    // @ts-ignore
    if (status === 200 && data.success) {
      console.log('we will miss you')
      dispatch({
        type: types.LOGOUT_SUCCESS,
        payload: null,
      });
      // navigate('Auth')
    }
  } catch (error) {
    // const displayErr = error.response.data.error.split(',')[0];
    dispatch({
      type: types.LOGOUT_FAIL,
      // @ts-ignore
      payload: error.respnse.data.error,
    });
  }
};
