import { FETCH_POSTS, RECEIVE_POSTS } from '../types/posts';

export interface IPostsState {
  loading: boolean;
  posts: IPost[];
}
export interface IPost {
  id: string;
  title: string;
  summary?: string;
  content?: string;
}

const initialState: IPostsState = {
  loading: false,
  posts: [],
};

export const posts = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        posts: state.posts.concat(action.posts),
      };
    default:
      return state;
  }
};
