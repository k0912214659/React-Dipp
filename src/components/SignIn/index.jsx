import React, {
  memo,
  useState,
  useMemo,
} from 'react';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useDispatch from '@Hooks/useDispatch';
import { postUserSession } from '@Reducers/user/actions';
import Image from '@Components/Base/Image';
import Loading from '@Components/Base/Loading';
import { loadImage } from '@Tools/image-loader';
import { getIsEmail } from '@Tools/utility';
import Styles from './index.module.css';

const LoginInfoDef = {
  email: '',
  password: '',
};

const FocusDef = {
  email: false,
  password: false,
};

function SignIn() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const [loginInformation, setLoginInformation] = useState(LoginInfoDef);
  const [isInputOnFocus, setIsInputOnFocus] = useState(FocusDef);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /* Functions */
  const requestPostUserInformation = (email, password, successCallback, failedCallback) => {
    dispatch(postUserSession(email, password, successCallback, failedCallback));
    setIsLoading(true);
  };
  const onFormTextChange = (event) => {
    const newLoginInformation = cloneDeep(loginInformation);
    const newIsInputOnFocus = cloneDeep(isInputOnFocus);
    switch (event.target.name) {
      case 'email':
        newLoginInformation.email = event.target.value;
        newIsInputOnFocus.email = true;
        break;
      case 'password':
        newLoginInformation.password = event.target.value;
        newIsInputOnFocus.password = true;
        break;
      default:
        break;
    }
    setIsInputOnFocus(newIsInputOnFocus);
    setLoginInformation(newLoginInformation);
  };
  const onTogglePasswordShow = () => {
    setIsShowPassword(!isShowPassword);
  };
  const onSignIn = () => {
    const failedCallback = () => {
      setIsLoading(false);
    };
    requestPostUserInformation(loginInformation.email, loginInformation.password, null, failedCallback);
  };
  const onSearchResult = debounce((value) => {
    onSignIn(value);
  }, 300);
  const onSearchKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearchResult();
    }
  };
  /* Data */
  const RenderSignInDisable = useMemo(() => {
    if (getIsEmail(loginInformation.email) && loginInformation.password.length > 6) {
      return false;
    }
    return true;
  }, [loginInformation]);
  const RenderErrorEmail = useMemo(() => {
    if (!loginInformation.email && isInputOnFocus.email) {
      return 'Please enter email';
    }
    if (!getIsEmail(loginInformation.email) && isInputOnFocus.email) {
      return 'Please enter valid email';
    }
    return '';
  }, [loginInformation, isInputOnFocus]);
  const RenderErrorEmailBoolean = useMemo(() => {
    if (!loginInformation.email && isInputOnFocus.email) {
      return true;
    }
    if (!getIsEmail(loginInformation.email) && isInputOnFocus.email) {
      return true;
    }
    return false;
  }, [loginInformation, isInputOnFocus]);
  const RenderErrorPassword = useMemo(() => {
    if (!loginInformation.password && isInputOnFocus.password) {
      return 'Please enter password';
    }
    if (loginInformation.password.length < 6 && isInputOnFocus.password) {
      return 'Password length need > 6 characters';
    }
    return '';
  }, [loginInformation, isInputOnFocus]);
  const RenderErrorPasswordBoolean = useMemo(() => {
    if (!loginInformation.password && isInputOnFocus.password) {
      return true;
    }
    if (loginInformation.password.length < 6 && isInputOnFocus.password) {
      return true;
    }
    return false;
  }, [loginInformation, isInputOnFocus]);
  const RenderShowPasswordType = useMemo(() => {
    if (isShowPassword) {
      return 'text';
    }
    return 'password';
  }, [isShowPassword]);
  const RenderShowPasswordIcon = useMemo(() => {
    if (isShowPassword) {
      return <Visibility />;
    }
    return <VisibilityOff />;
  }, [isShowPassword]);
  /* Views */
  const RenderLoading = useMemo(() => (
    <Loading
      typePosition="relative"
      typeZIndex={10003}
      typeIcon="line:relative"
      isLoading={isLoading}
    />
  ), [isLoading]);
  /* Main */
  return (
    <div className={classNames(Styles.signInContainer)}>
      <Grid
        className={classNames(Styles.signInMainContainer)}
        container
        spacing={2}
        direction="row"
        justify="center"
      >
        <Grid
          className={classNames(Styles.signInInnerContainer)}
          item
          xs={10}
          sm={6}
          md={4}
        >
          <div className={classNames(Styles.signInFormContainer)}>
            <div className={classNames(Styles.signInFormIconContainer)}>
              <div className={classNames(Styles.signInFormIconImageContainer)}>
                <Image
                  className={classNames(Styles.headerImageStyle)}
                  src={loadImage('general/logo.png')}
                  alt="classroom-home"
                  typeSize="fit"
                />
              </div>
              <div className={classNames(Styles.signInFormIconTextContainer)}>
                React Dipp Weather App
              </div>
            </div>
            <div className={classNames(Styles.signInFormInputContainer)}>
              <TextField
                id="email"
                label="Email"
                name="email"
                fullWidth
                onChange={onFormTextChange}
                helperText={RenderErrorEmail}
                error={RenderErrorEmailBoolean}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={classNames(Styles.signInFormInputContainer)}>
              <TextField
                id="password"
                label="Password"
                name="password"
                type={RenderShowPasswordType}
                fullWidth
                helperText={RenderErrorPassword}
                error={RenderErrorPasswordBoolean}
                onChange={onFormTextChange}
                onKeyDown={onSearchKeyDown}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle visibility"
                        onClick={onTogglePasswordShow}
                      >
                        {RenderShowPasswordIcon}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={classNames(Styles.signInFormActionContainer)}>
              <Button
                fullWidth
                disabled={RenderSignInDisable}
                onClick={onSignIn}
              >
                Sign In
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      {RenderLoading}
    </div>
  );
}

export default memo(SignIn);
