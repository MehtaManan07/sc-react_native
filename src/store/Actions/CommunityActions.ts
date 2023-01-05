import * as types from '../types';
import axios from '../../constants/api';
const url = `/api/v1/communities`;

import AsyncStorage from '@react-native-async-storage/async-storage';
const returnToken = async () => {
  const token = await AsyncStorage.getItem('verseJWTtoken');
  return token;
};

export const getNames = () => async (dispatch: any) => {
  try {
    const token = await returnToken();
    const response = await axios.get(`${url}?select=name`,{ headers: { Authorization: `Bearer ${token}` } });
    dispatch({type: types.GET_COMMUNITY_NAMES, payload: response.data.data});
  } catch (error) {
    console.log({error});
    // const displayErr = error.response.data.error.split(',')[0];
    // @ts-ignore
    dispatch({type: types.COMMUNITY_NAMES_FAIL, payload: error?.respnse});
  }
};

export const getCommunities =
  (query: any = '') =>
  async (dispatch: any) => {
    dispatch({type: types.GET_COMMUNITIES_LOADING});
    try {
      const token = await returnToken();
      const response = await axios.get(`${url}?${query}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      dispatch({
        type: types.GET_COMMUNITIES_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      console.log({error});
      // const displayErr = error.response.data.error.split(',')[0];
      // @ts-ignore
      dispatch({type: types.GET_COMMUNITIES_FAIL, payload: error?.respnse});
    }
  };

export const getCommunitiy =
  (id: any) =>
  async (dispatch: any) => {
    dispatch({type: types.GET_COMMUNITY_LOADING});
    try {
      const token = await returnToken();
      const response = await axios.get(`${url}/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if(response.data.success){
        dispatch({
          type: types.GET_COMMUNITY_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log({error});
      // const displayErr = error.response.data.error.split(',')[0];
      // @ts-ignore
      dispatch({type: types.GET_COMMUNITY_FAIL, payload: error?.respnse});
    }
  };

export const joinCommunity =
  (id: any) =>
  async (dispatch: any) => {
    dispatch({type: types.JOIN_LOADING});
    try {
      const token = await returnToken();
      const response = await axios.put(`${url}/join/${id}`,{}, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if(response.data.success){
        dispatch({
          type: types.JOIN_COMMUNITY_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log({error});
      // const displayErr = error.response.data.error.split(',')[0];
      // @ts-ignore
      dispatch({type: types.JOIN_COMMUNITY_FAIL, payload: error?.respnse});
    }
  };

export const leaveCommunity =
  (id: any) =>
  async (dispatch: any) => {
    dispatch({type: types.JOIN_LOADING});
    try {
      const token = await returnToken();
      const response = await axios.put(`${url}/leave/${id}`,{}, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if(response.data.success){
        dispatch({
          type: types.LEAVE_COMMUNITY_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log({error});
      // const displayErr = error.response.data.error.split(',')[0];
      // @ts-ignore
      dispatch({type: types.LEAVE_COMMUNITY_FAIL, payload: error?.respnse});
    }
  };
