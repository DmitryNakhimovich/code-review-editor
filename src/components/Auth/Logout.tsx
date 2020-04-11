import React, { useCallback, FunctionComponent, ReactElement } from 'react';
import { ListItemIcon, MenuItem, makeStyles } from '@material-ui/core';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/actions/user';

import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import classnames from 'classnames';
import { useTranslate, useLogout } from 'ra-core';

interface Props {
  className?: string;
  redirectTo?: string;
  icon?: ReactElement;
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    menuItem: {
      color: theme.palette.text.secondary,
    },
    icon: { minWidth: theme.spacing(5) },
  }),
  { name: 'RaLogout' }
);

const LogoutWithRef: FunctionComponent<Props & MenuItemProps<'li', { button: true }>> = React.forwardRef(
  function Logout(props, ref) {
    const { className, classes: classesOverride, redirectTo, icon, ...rest } = props;
    const classes = useStyles(props);
    const translate = useTranslate();
    const logout = useLogout();
    const dispatch = useDispatch();
    const handleClick = useCallback(() => {
      dispatch(clearUser());
      return logout(redirectTo);
    }, [redirectTo, logout]);
    return (
      <MenuItem className={classnames('logout', classes.menuItem, className)} onClick={handleClick} ref={ref} {...rest}>
        <ListItemIcon className={classes.icon}>{icon ? icon : <ExitIcon />}</ListItemIcon>
        {translate('ra.auth.logout')}
      </MenuItem>
    );
  }
);

export default LogoutWithRef;
