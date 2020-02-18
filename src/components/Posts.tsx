import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '@material-ui/core/CircularProgress';
import { fetchPosts } from '../redux/actions/posts';

export const Posts = () => {
  const dispatch = useDispatch<any>();
  const posts = useSelector((state: any) => state.posts);

  useEffect(() => dispatch(fetchPosts()), []);

  return (
    <div>
      {posts.loading && <Preloader />}
      {posts.posts.map((post: any) => (
        <p>{post.title}</p>
      ))}
    </div>
  );
};
