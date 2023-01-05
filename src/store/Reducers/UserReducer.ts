import {
  PROFILE_LOADING,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  EMPTY_PROFILE,
  FOLLOW_FAIL,
  FOLLOW_LOADING,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAIL,
  UNFOLLOW_SUCCESS
} from '../types';

const initialState = {
  profile: null,
  loading: false,
  followLoading: false,
  error: null,
};
export const User = (state = initialState, action: any) => {
  const {type, payload} = action;
  switch (type) {
    case PROFILE_LOADING:
      return {...state, loading: true};
    case FOLLOW_LOADING:
      return { ...state, followLoading: true }
    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.user,
        error: null,
        loading: false,
      };
    case FOLLOW_SUCCESS:
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        error: null,
        profile: payload.user,
        followLoading: false
      }
    case EMPTY_PROFILE:
      return { ...state, profile: null }
    case GET_PROFILE_FAIL:
    case FOLLOW_FAIL:
    case UNFOLLOW_FAIL:
      console.log({ payload })
      return {...state, error: payload, loading: false, followLoading: false};
    default:
      return state;
  }
};
