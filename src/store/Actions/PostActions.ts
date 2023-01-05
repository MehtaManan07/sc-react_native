import * as types from '../types';
import axios from '../../constants/api';
const url = `/api/v1/posts`;
import AsyncStorage from '@react-native-async-storage/async-storage';
const returnToken = async () => {
  const token = await AsyncStorage.getItem('verseJWTtoken');
  return token;
};

export const newPost =
  (data, showMessage, goBack) => async (dispatch: any) => {
    dispatch({type: types.POSTS_LOADING});
    try {
      const token = await returnToken();
      const response = await axios.post(`${url}`, data, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (response.status === 201) {
        dispatch({
          type: types.NEW_POST_SUCCESS,
          payload: response.data.data,
        });
        // navigate('Home');
        goBack();
        showMessage({message: 'Posted Successfully', type: 'success'});
      }
    } catch (error) {
      // @ts-ignore
      console.log({error});
      // @ts-ignore
      showMessage({message: error.response.data.error, type: 'danger'});
      // const displayErr = error.response.data.error.split(',')[0];
      // @ts-ignore
      dispatch({type: types.NEW_POST_FAIL, payload: error?.respnse?.data});
    }
  };

export const updatePost =
  (data, showMessage, goBack, id) => async (dispatch: any) => {
    dispatch({type: types.POSTS_LOADING});
    try {
      const token = await returnToken();
      const response = await axios.put(`${url}/${id}`, data, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (response.status === 200) {
        dispatch({
          type: types.UPDATE_POST_SUCCESS,
          payload: response.data.data,
        });
        // navigate('Home');
        goBack();
        showMessage({message: 'Post Updated Successfully', type: 'success'});
      }
    } catch (error) {
      // @ts-ignore
      console.log({error});
      // @ts-ignore
      showMessage({message: error.response.data.error, type: 'danger'});
      // const displayErr = error.response.data.error.split(',')[0];
      // @ts-ignore
      dispatch({type: types.UPDATE_POST_FAIL, payload: error?.respnse?.data});
    }
  };

export const newComment =
  (values, showMessage, setText) => async (dispatch: any) => {
    dispatch({type: types.LOADING_COMMENT});
    try {
      const token = await returnToken();
      const {data, status} = await axios.post(`/api/v1/comments`, values, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (data.success) {
        console.log({ data, status })
        dispatch({
          type: types.NEW_COMMENT_SUCCESS,
          payload: data.data,
        });
        setText('');
        showMessage({message: 'Commented Successfully', type: 'success'});
      }
    } catch (error) {
      // @ts-ignore
      if (error.response.data) {
        // @ts-ignore
        console.log({err: error.response.data});
      }
      // @ts-ignore
      showMessage({message: `${error.response.data.error}`, type: 'danger'});
      // @ts-ignore
      dispatch({type: types.NEW_COMMENT_FAIL, payload: error?.respnse?.data});
    }
  };

export const getPosts =
  (query: any = '') =>
  async (dispatch: any) => {
    dispatch({type: types.POSTS_LOADING});
    try {
      const token = await returnToken();
      const response = await axios.get(`${url}?${query}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      dispatch({
        type: types.GET_POSTS_SUCCESS,
        // @ts-ignore
        payload: response.data.data,
      });
    } catch (error) {
      console.log({error});
      // @ts-ignore
      dispatch({type: types.GET_POSTS_FAIL, payload: error?.respnse});
    }
  };
export const getSinglePost =
  (id: any = '') =>
  async (dispatch: any) => {
      dispatch({type: types.LOADING_POST});
      try {
        const token = await returnToken();
        const response = await axios.get(`${url}/${id}`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        dispatch({
          type: types.GET_SINGLE_POST_SUCCESS,
          // @ts-ignore
          payload: response.data.data,
        });
      } catch (error) {
        console.log({error});
        // @ts-ignore
        dispatch({type: types.GET_SINGLE_POST_FAIL, payload: error?.respnse});
    
    };
  };
  
export const getCommunityPosts =
  (id: any = '') =>
  async (dispatch: any) => {
    try {
      const token = await returnToken();
      const response = await axios.get(
        `${url}?community=${id}&populate_community=name&populate_author=avatar,username,firstName,lastName`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      dispatch({
        type: types.GET_OTHER_POSTS,
        // @ts-ignore
        payload: response.data.data,
      });
    } catch (error) {
      console.log({error});
      // @ts-ignore
      dispatch({type: types.GET_POSTS_FAIL, payload: error?.respnse});
    }
  };

export const getMyPosts =
  (id: any = '') =>
  async (dispatch: any) => {
    try {
      const token = await returnToken();
      const response = await axios.get(
        `${url}?author=${id}&populate_community=name&populate_author=avatar,username`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      dispatch({
        type: types.GET_OTHER_POSTS,
        // @ts-ignore
        payload: response.data.data,
      });
    } catch (error) {
      console.log({error});
      // @ts-ignore
      dispatch({type: types.GET_POSTS_FAIL, payload: error?.respnse});
    }
  };

export const LikePost = (id: any) => async (dispatch: any) => {
  try {
    const token = await returnToken();
    const response = await axios.put(
      `${url}/upvote/${id}`,
      {},
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    dispatch({
      type: types.UPVOTE_POST_SUCCESS,
      // @ts-ignore
      payload: response.data.data,
    });
  } catch (error) {
    console.log({error});
    // @ts-ignore
    dispatch({type: types.UPVOTE_POST_FAIL, payload: error?.respnse});
  }
};

export const UnLikePost = (id: any) => async (dispatch: any) => {
  try {
    const token = await returnToken();
    const response = await axios.put(
      `${url}/downvote/${id}`,
      {},
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    dispatch({
      type: types.DOWNVOTE_POST_SUCCESS,
      // @ts-ignore
      payload: response.data.data,
    });
  } catch (error) {
    console.log({error});
    // @ts-ignore
    dispatch({type: types.DOWNVOTE_POST_FAIL, payload: error?.respnse});
  }
};

export const deletePost = (id: any) => async (dispatch: any) => {
  try {
    const token = await returnToken();
    const {data} = await axios.delete(`${url}/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    if (!data) {
      dispatch({
        type: types.DELETE_POST_SUCCESS,
        payload: id,
      });
    }
  } catch (error) {
    console.log({error});
    // @ts-ignore
    dispatch({type: types.DELETE_POST_FAIL, payload: error?.respnse});
  }
};