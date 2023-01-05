import * as types from '../types';

const initialState = {
  posts: null,
  loading: false,
  post: false,
  error: null,
  commLoading: false,
  comments: [],
  otherPosts: [],
};
const updateItemInArr = (arr, old, neww) => {
  let i = arr.findIndex(n => n === old);
  arr[i] = neww;
  return arr;
};
export const Post = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case types.EMPTY_COMMUNITY:
    case types.EMPTY_POSTS:
      return {
        ...state,
        otherPosts: [],
      };
    case types.POSTS_LOADING:
    case types.LOADING_POST:
      return {
        ...state,
        loading: true,
      };
    case types.NEW_POST_SUCCESS:
      return {
        ...state,
        // @ts-ignore
        posts: [payload, ...state.posts],
        otherPosts: [payload, ...state.otherPosts],
        loading: false,
        error: null,
      };
    case types.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case types.GET_OTHER_POSTS:
      return {
        ...state,
        loading: false,
        otherPosts: payload,
      };
    case types.GET_SINGLE_POST_SUCCESS:
    case types.UPDATE_POST_SUCCESS:
      console.log({payload: payload.description})
      return {
        ...state,
        loading: false,
        post: payload,
      };
    case types.EMPTY_SINGLE_POST:
      return {
        ...state,
        post: initialState.post,
      };
    case types.LOADING_COMMENT:
      return {
        ...state,
        commLoading: true,
      };
    case types.NEW_COMMENT_SUCCESS:
      console.log('ohho', payload);
      return {
        ...state,
        commLoading: false,
        // @ts-ignore
        post: {...state.post, comments: [payload, ...state.post.comments]},
        // @ts-ignore
        // post: [payload, ...state.comments],
      };
    case types.UPVOTE_POST_SUCCESS:
    case types.DOWNVOTE_POST_SUCCESS:
      return {
        ...state,
        // @ts-ignore
        posts: state.posts.map(post =>
          post._id === payload._id
            ? {
                ...post,
                upvotes: payload.upvotes,
                downvotes: payload.downvotes,
                voteCount: payload.voteCount,
              }
            : post,
        ),
        post: {
          // @ts-ignore
          ...state.post,
          upvotes: payload.upvotes,
          downvotes: payload.downvotes,
          voteCount: payload.voteCount,
        },
        otherPosts: state.otherPosts.map((post: any) =>
          post._id === payload._id
            ? {
                ...post,
                upvotes: payload.upvotes,
                downvotes: payload.downvotes,
                voteCount: payload.voteCount,
              }
            : post,
        ),
      };
    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        // @ts-ignore
        posts: state.posts.filter(post => post._id !== payload),
        otherPosts: state.otherPosts.filter(
          (post: any) => post._id !== payload,
        ),
        loading: false,
      };
    case types.NEW_COMMENT_FAIL:
      return {
        ...state,
        commLoading: false,
      };
    case types.NEW_POST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
