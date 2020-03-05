import React, { memo } from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Image from '@Components/Base/Image';
import { loadImage } from '@Tools/image-loader';
import Styles from './index.module.css';

function SignIn() {
  /* Global & Local States */
  /* Functions */
  /* Views */
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
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={classNames(Styles.signInFormInputContainer)}>
              <TextField
                id="password"
                label="Password"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={classNames(Styles.signInFormActionContainer)}>
              <Button fullWidth>
                Sign In
              </Button>
              <Button fullWidth>
                Sign Up
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(SignIn);
