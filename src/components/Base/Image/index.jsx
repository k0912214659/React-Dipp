import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import Loading from '@Components/Base/Loading';
import { loadImage } from '@Tools/image-loader';
import Styles from './index.module.css';

function Image(ImageProps) {
  /* Global & Local State */
  const {
    className,
    typeCircular,
    typeBorder,
    typeSize,
    typeAsCover,
    customErrorImage,
  } = ImageProps;
  const imageRefs = useRef(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  /* Functions */
  const onError = (event) => {
    let errorImage = '';
    if (customErrorImage) {
      errorImage = customErrorImage;
    } else {
      errorImage = loadImage('general/logo.png');
    }
    event.currentTarget.onerror = null;
    event.currentTarget.src = errorImage;
    setIsLoaded(false);
  };
  const onLoadedEnd = () => {
    if (imageRefs.current) {
      setIsLoaded(false);
    }
  };
  const registeredLoadEvent = useCallback(() => {
    if (imageRefs.current) {
      if (imageRefs.current.complete) {
        onLoadedEnd();
      } else {
        imageRefs.current.addEventListener('load', onLoadedEnd, true);
      }
    }
  }, [imageRefs, isMounted]);
  const unregisteredLoadEvent = useCallback(() => {
    if (imageRefs.current) {
      imageRefs.current.removeEventListener('load', onLoadedEnd);
    }
  }, [imageRefs, isMounted]);
  /* Views */
  const RenderCircular = useMemo(() => {
    if (typeCircular) {
      return Styles.imageCircular;
    }
    return '';
  }, [typeCircular]);
  const RenderBorder = useMemo(() => {
    if (typeBorder) {
      return Styles.imageBorder;
    }
    return '';
  }, [typeBorder]);
  const RenderSize = useMemo(() => {
    switch (typeSize) {
      case 'small':
        return Styles.imageSmallContainer;
      case 'medium':
        return Styles.imageMediumContainer;
      case 'large':
        return Styles.imageLargeContainer;
      case 'fit':
        return Styles.imageFitContainer;
      default:
        return Styles.imageContainer;
    }
  }, [typeSize]);
  const RenderCover = useMemo(() => {
    if (typeAsCover) {
      return Styles.imageCover;
    }
    return Styles.imageContain;
  }, [typeAsCover]);
  const RenderNativeImageProps = useMemo(() => {
    const newProps = cloneDeep(ImageProps);
    delete newProps.className;
    delete newProps.typeCircular;
    delete newProps.typeBorder;
    delete newProps.typeSize;
    delete newProps.typeAsCover;
    delete newProps.customErrorImage;
    return newProps;
  }, [ImageProps]);
  /* Hooks */
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    registeredLoadEvent();
    return () => {
      unregisteredLoadEvent();
      setIsMounted(false);
    };
  }, [imageRefs]);
  return (
    <React.Fragment>
      <img
        className={classNames(className, RenderBorder, RenderCircular, RenderSize, RenderCover)}
        onError={onError}
        ref={imageRefs}
        alt="custom"
        {...RenderNativeImageProps}
      />
      <Loading
        typePosition="relative"
        typeBackground="white"
        isLoading={isLoaded}
        isHideText
      />
    </React.Fragment>
  );
}

export default memo(Image);
