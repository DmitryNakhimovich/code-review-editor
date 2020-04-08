const POST_COUNT = 5;
export const fetchPosts = () => (dispatch: any) => {
  // emulate api request
  dispatch({ type: 1 });
  // setTimeout(() => dispatch(receivePosts(POST_COUNT)), 1000);
};

export const fetchPost = (id: string) => (dispatch: any) => {
  // emulate api request
  dispatch({ type: 2 });
  // setTimeout(() => dispatch(receivePosts(1, { id })), 1000);
};
