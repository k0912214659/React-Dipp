import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AnimationProviderFade } from '../Animation';
import Styles from './index.module.css';

const DefAnimationStyle = {
  from: { opacity: 0, zIndex: 9999 },
  enter: { opacity: 1, zIndex: 10000 },
  leave: { opacity: 0, zIndex: 9999 },
};

const FixLinearProgress = withStyles({
  root: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
  },
})(LinearProgress);

const RelativeLinearProgress = withStyles({
  root: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
})(LinearProgress);

function Loading(componentProps) {
  /* Global & Local States */
  const {
    typePosition,
    typeBackground,
    typeZIndex,
    typeIcon,
    isLoading,
    isHideText,
  } = componentProps;
  /* Views */
  const RenderPosition = useMemo(() => {
    switch (typePosition) {
      case 'relative':
        return Styles.relateScreenLoadingContainer;
      case 'absolute':
        return Styles.fullScreenLoadingContainer;
      default:
        return Styles.fullScreenLoadingContainer;
    }
  }, [typePosition]);
  const RenderBackground = useMemo(() => {
    switch (typeBackground) {
      case 'white':
        return Styles.backgroundWhite;
      case 'black':
        return Styles.backgroundBlack;
      default:
        return '';
    }
  }, [typeBackground]);
  const RenderTextColor = useMemo(() => {
    switch (typeBackground) {
      case 'white':
        return Styles.loadingTextWhite;
      case 'black':
        return Styles.loadingTextBlack;
      default:
        return Styles.loadingTextWhite;
    }
  }, [typeBackground]);
  const RenderText = useMemo(() => {
    if (isHideText) {
      return (<React.Fragment />);
    }
    return (
      <div className={classNames(RenderTextColor, Styles.loadingTextStyle)}>
        Loading
      </div>
    );
  }, [isHideText, typeBackground]);
  const RenderZIndex = useMemo(() => {
    if (typeZIndex) {
      return (
        {
          from: { opacity: 0, zIndex: typeZIndex },
          enter: { opacity: 1, zIndex: typeZIndex + 1 },
          leave: { opacity: 0, zIndex: typeZIndex },
        }
      );
    }
    return DefAnimationStyle;
  }, [typeZIndex]);
  const RenderAnimation = useMemo(() => {
    if (!typeIcon) {
      return (
        <div className={classNames(Styles.loadingAreaContainer)}>
          <CircularProgress size={30} thickness={5} className={classNames(Styles.loadingCustomColor)} />
          {RenderText}
        </div>
      );
    }
    switch (typeIcon) {
      case 'basic':
        return (
          <div className={`${Styles.loadingAreaContainer}`}>
            <CircularProgress size={30} thickness={5} className={classNames(Styles.loadingCustomColor)} />
            {RenderText}
          </div>
        );
      case 'icon':
        return (
          <div className={`${Styles.loadingAreaContainer}`}>
            {RenderText}
          </div>
        );
      case 'line:fix':
        return (<FixLinearProgress />);
      case 'line:relative':
        return (<RelativeLinearProgress />);
      default:
        return (<React.Fragment />);
    }
  }, [typeIcon]);
  return (
    <AnimationProviderFade
      typeAnimation={isLoading}
      typeAnimationStyle={RenderZIndex}
    >
      <div className={classNames(RenderPosition, RenderBackground, Styles.flexCentral)}>
        {RenderAnimation}
      </div>
    </AnimationProviderFade>
  );
}

export default memo(Loading);
