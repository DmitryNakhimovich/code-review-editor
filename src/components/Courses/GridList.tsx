import React from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { Link } from 'react-router-dom';
import { linkToRecord } from 'ra-core';
import { HOST_PROVIDER } from '../../constants/Host';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/reducers/user';
import IconButton from '@material-ui/core/IconButton';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';

interface IGridList {
  width?: string;
  nbItems?: number;
  ids?: any[];
  data?: any;
  basePath?: string;
  loaded?: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: '-2px',
  },
  gridList: {
    width: '100%',
    margin: 0,
  },
  tileBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
  },
  tileBarIcon: {
    background: 'none',
  },
  placeholder: {
    backgroundColor: theme.palette.grey[300],
    height: '100%',
  },
  price: {
    display: 'inline',
    fontSize: '1em',
  },
  link: {
    color: '#fff',
  },
}));

const getColsForWidth = (width: string) => {
  if (width === 'xs') return 2;
  if (width === 'sm') return 3;
  if (width === 'md') return 4;
  if (width === 'lg') return 5;
  return 6;
};
const times = (nbChildren: number, fn: any) => Array.from({ length: nbChildren }, (_, key) => fn(key));
const cellHeight = 250;

const LoadingGridList = ({ width = 'lg', nbItems = 10 }: IGridList) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MuiGridList cellHeight={cellHeight} cols={getColsForWidth(width)} className={classes.gridList}>
        {' '}
        {times(nbItems, (key: any) => (
          <GridListTile key={key}>
            <div className={classes.placeholder} />
          </GridListTile>
        ))}
      </MuiGridList>
    </div>
  );
};

const LoadedGridList = ({ ids = [], data, basePath, width = 'xl' }: IGridList) => {
  const classes = useStyles();
  const { courses: userCourses = [] } = useSelector((state: IAppState) => state.user);
  return (
    <div className={classes.root}>
      <MuiGridList cellHeight={cellHeight} cols={getColsForWidth(width)} className={classes.gridList}>
        {ids.map(id => (
          <GridListTile component={Link} key={id} to={linkToRecord(basePath, data[id].id)}>
            <img
              src={data[id].image ? `${HOST_PROVIDER}${data[id].image.url}` : '/image/nopic.png'}
              alt={data[id].Title}
            />
            {userCourses.includes(data[id].id) && (
              <GridListTileBar
                titlePosition="top"
                actionIcon={
                  <IconButton disabled={true}>
                    <StarTwoToneIcon fontSize={'large'} style={{ color: 'yellow' }} />
                  </IconButton>
                }
                actionPosition="right"
                className={classes.tileBarIcon}
              />
            )}
            <GridListTileBar className={classes.tileBar} title={data[id].Title} />
          </GridListTile>
        ))}
      </MuiGridList>
    </div>
  );
};

const GridList = ({ loaded, ...props }: IGridList) =>
  loaded ? <LoadedGridList {...props} /> : <LoadingGridList {...props} />;

export default withWidth()(GridList);
