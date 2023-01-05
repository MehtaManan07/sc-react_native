import {
  GET_COMMUNITIES_FAIL,
  GET_COMMUNITIES_SUCCESS,
  GET_COMMUNITIES_LOADING,
  GET_COMMUNITY_LOADING,
  GET_COMMUNITY_SUCCESS,
  JOIN_LOADING,
  GET_COMMUNITY_NAMES,
  JOIN_COMMUNITY_SUCCESS,
  LEAVE_COMMUNITY_SUCCESS,
  EMPTY_COMMUNITY,
} from '../types';

const initialState = {
  communities: null,
  communityNames: [],
  loading: false,
  community: null,
  error: null,
  joinLoading: false,
};
export const Community = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case EMPTY_COMMUNITY:
      return {
        ...state,
        community: null,
      }
    case GET_COMMUNITIES_LOADING:
    case GET_COMMUNITY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case JOIN_LOADING:
      return {
        ...state,
        joinLoading: true,
      };
    case GET_COMMUNITY_NAMES:
      return {
        ...state,
        communityNames: payload,
      };
    case GET_COMMUNITIES_SUCCESS:
      return {
        ...state,
        communities: payload,
        loading: false,
        error: null,
      };
    case GET_COMMUNITY_SUCCESS:
      return {
        ...state,
        community: payload,
        loading: false,
        error: null,
      };
    case JOIN_COMMUNITY_SUCCESS:
    case LEAVE_COMMUNITY_SUCCESS:
      return {
        ...state,
        community: payload,
        error: null,
        joinLoading: false,
      };
    case GET_COMMUNITIES_FAIL:
      return {
        ...state,
        error: payload,
        communities: null,
        community: null,
      };
    default:
      return state;
  }
};
