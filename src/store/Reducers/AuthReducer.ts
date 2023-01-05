import * as types from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  loading: false,
  error: null,
  nums: [],
  usernames: [],
  otp: null,
  token: null,
};
export const Auth = (state = initialState, action: any) => {
  const {type, payload} = action;
  switch (type) {
    case types.GET_OTP_LOADING:
    case types.AUTH_LOADING:
      return {...state, loading: true};
    case types.GET_USERNAMES:
      return {...state, usernames: payload};
    case types.GET_PHONE_NUMS:
      return {...state, nums: payload};
    case types.GET_OTP_SUCCESS:
      return {...state, loading: false, otp: payload.otp};
    case types.AUTH_SUCCESS:
      const {data, token} = payload;
      AsyncStorage.setItem('verseJWTtoken', token);
      return {
        ...state,
        user: data,
        error: null,
        loading: false,
        token,
      };
    case types.GET_ME_SUCCESS:
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload.user,
        error: null,
        loading: false,
      };
    case types.PHONE_NUMS_FAIL:
    case types.GET_OTP_FAIL:
      return {...state, loading: false, error: payload};
    case types.AUTH_FAIL:
    case types.GET_ME_FAIL:
    case types.LOGOUT_SUCCESS:
      console.log('reached error', payload);
      AsyncStorage.removeItem('verseJWTtoken');
      return {...state, user: null, error: payload, loading: false};
    default:
      return state;
  }
};
