import { FETCH_POSTS, RECEIVE_POSTS } from '../types/posts';

const POST_COUNT = 5;
export const fetchPosts = () => {
  return (dispatch: any) => {
    // emulate api request
    dispatch({ type: FETCH_POSTS });
    // setTimeout(() => dispatch(receivePosts(POST_COUNT)), 1000);
  };
};

export const fetchPost = (id: string) => {
  return (dispatch: any) => {
    // emulate api request
    dispatch({ type: FETCH_POSTS });
    // setTimeout(() => dispatch(receivePosts(1, { id })), 1000);
  };
};
