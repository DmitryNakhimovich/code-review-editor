import React from 'react';
import { List, Pagination } from 'react-admin';
import GridList from './GridList';

const CoursesList = (props: JSX.IntrinsicAttributes) => (
  <List {...props} pagination={<Pagination />} exporter={false}>
    <GridList />
  </List>
);

export default CoursesList;
