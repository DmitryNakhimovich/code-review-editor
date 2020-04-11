import React, { HtmlHTMLAttributes, ReactNode, useRef, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { Card, Avatar, createMuiTheme, makeStyles, Theme, ThemeProvider } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { StaticContext } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useCheckAuth, useTranslate, useLogin, useNotify, useSafeSetState } from 'ra-core';
import { Field, FieldRenderProps, Form, FormRenderProps } from 'react-final-form';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Notification, defaultTheme } from 'react-admin';
import { useDispatch } from 'react-redux';
import { receiveUser } from '../../redux/actions/user';

interface Props {
  backgroundImage?: string;
  children: ReactNode;
  classes?: object;
  className?: string;
  staticContext?: StaticContext;
  theme: object;
  redirectTo?: string;
}

interface FormData {
  username: string;
  password: string;
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    main: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      height: '1px',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: 'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
    },
    card: {
      minWidth: 300,
      marginTop: '6em',
    },
    avatar: {
      margin: '1em',
      display: 'flex',
      justifyContent: 'center',
    },
    icon: {
      backgroundColor: theme.palette.secondary.light,
    },
    form: {
      padding: '0 1em 1em 1em',
    },
    input: {
      marginTop: '1em',
    },
    button: {
      width: '100%',
    },
    iconRight: {
      marginRight: theme.spacing(1),
    },
  }),
  { name: 'RaLogin' }
);

const Input = ({ meta: { touched, error }, input: inputProps, ...props }: FieldRenderProps<any>) => (
  <TextField error={!!(touched && error)} helperText={touched && error} {...inputProps} {...props} fullWidth={true} />
);

const Login: React.FunctionComponent<Props & HtmlHTMLAttributes<HTMLDivElement>> = props => {
  const {
    redirectTo,
    theme,
    classes: classesOverride,
    className,
    children,
    staticContext,
    backgroundImage,
    ...rest
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const classes = useStyles(props);
  const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);
  let backgroundImageLoaded = false;
  const checkAuth = useCheckAuth();
  const [loading, setLoading] = useSafeSetState<boolean>(false);
  const login = useLogin();
  const translate = useTranslate();
  const notify = useNotify();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    checkAuth({}, false)
      .then(() => {
        // already authenticated, redirect to the home page
        history.push('/');
      })
      .catch(() => {
        // not authenticated, stay on the login page
      });
  }, [checkAuth, history]);

  const updateBackgroundImage = () => {
    if (!backgroundImageLoaded && containerRef.current) {
      if (containerRef && containerRef.current) {
        containerRef.current.style.backgroundImage = `url(${backgroundImage})`;
      }
      backgroundImageLoaded = true;
    }
  };
  const lazyLoadBackgroundImage = () => {
    if (backgroundImage) {
      const img = new Image();
      img.onload = updateBackgroundImage;
      img.src = backgroundImage;
    }
  };
  useEffect(() => {
    if (!backgroundImageLoaded) {
      lazyLoadBackgroundImage();
    }
  });

  const validate = (values: FormData) => {
    const errors: FormData = { username: undefined!, password: undefined! };

    if (!values.username) {
      errors.username = translate('ra.validation.required');
    }
    if (!values.password) {
      errors.password = translate('ra.validation.required');
    }
    return errors;
  };

  const submit = (values: FormData) => {
    setLoading(true);
    login(values, redirectTo)
      .then(response => {
        setLoading(false);
        dispatch(receiveUser(response));
      })
      .catch(error => {
        setLoading(false);
        notify(
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
            ? 'ra.auth.sign_in_error'
            : error.message,
          'warning'
        );
      });
  };

  const renderForm = () => ({ handleSubmit }: FormRenderProps) => (
    <form onSubmit={handleSubmit} noValidate={true}>
      <div className={classes.form}>
        <div className={classes.input}>
          <Field
            autoFocus={true}
            id="username"
            name="username"
            component={Input}
            label={translate('ra.auth.username')}
            disabled={loading}
          />
        </div>
        <div className={classes.input}>
          <Field
            id="password"
            name="password"
            component={Input}
            label={translate('ra.auth.password')}
            type="password"
            disabled={loading}
            autoComplete="current-password"
          />
        </div>
      </div>
      <CardActions>
        <Button variant="contained" type="submit" color="primary" disabled={loading} className={classes.button}>
          {loading && <CircularProgress className={classes.iconRight} size={18} thickness={2} />}
          {translate('ra.auth.sign_in')}
        </Button>
      </CardActions>
    </form>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classnames(classes.main, className)} {...rest} ref={containerRef}>
        <Card className={classes.card}>
          <div className={classes.avatar}>
            <Avatar className={classes.icon}>
              <LockIcon />
            </Avatar>
          </div>
          <Form onSubmit={submit} validate={validate}>
            {renderForm()}
          </Form>
        </Card>
        <Notification />
      </div>
    </ThemeProvider>
  );
};

Login.defaultProps = {
  theme: defaultTheme,
};

export default Login;
