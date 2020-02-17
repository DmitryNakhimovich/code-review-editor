import faker from 'faker';
import { FETCH_POSTS, RECEIVE_POSTS } from '../types/posts';

const {
  lorem: { paragraph, paragraphs, words },
  random: { uuid, number },
} = faker;

export const receivePosts = (
  count = 1,
  options = {
    id: '',
  },
) => {
  const posts = Array(count)
    .fill({})
    .map(() => {
      const summary = paragraph();
      return {
        id: options.id || uuid().split('-')[0],
        title: words(),
        summary,
        content: `${summary}\n${paragraphs()}`,
      };
    });

  return {
    type: RECEIVE_POSTS,
    posts,
  };
};

const POST_COUNT = 5;
export const fetchPosts = () => {
  return (dispatch: any) => {
    // emulate api request
    dispatch({ type: FETCH_POSTS });
    setTimeout(() => dispatch(receivePosts(POST_COUNT)), 1000);
  };
};

export const fetchPost = (id: string) => {
  return (dispatch: any) => {
    // emulate api request
    dispatch({ type: FETCH_POSTS });
    setTimeout(() => dispatch(receivePosts(1, { id })), 1000);
  };
};
