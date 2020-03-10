import React, {
  memo,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import useDidMount from '@Hooks/useDidMount';
import ADParser from '@Models/AD/ADParser';
import Styles from './index.module.css';

function ADCanvas(adCanvasProps) {
  /* Global & Local States */
  const { adContent } = adCanvasProps;
  const canvasRef = useRef(null);
  const canvasParserClass = useRef(null);
  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  /* Functions */
  const initialize = () => {
    setIsFirstUpdate(true);
  };
  /* Views */
  const RenderDownloadButton = useMemo(() => {
    const { current } = canvasParserClass;
    if (adContent.selectIndex > -1) {
      return (
        <IconButton
          aria-label="download"
          onClick={() => current.exportCanvas()}
        >
          <GetAppIcon />
        </IconButton>
      );
    }
    return (<React.Fragment />);
  }, [adContent, canvasRef]);
  /* Hooks */
  useDidMount(() => {
    initialize();
  });
  useEffect(() => {
    if (canvasRef.current) {
      canvasParserClass.current = new ADParser(canvasRef.current);
    }
  }, [canvasRef]);
  useEffect(() => {
    if (!isFirstUpdate) return;
    const { current } = canvasParserClass;
    if (adContent.selectIndex > -1) {
      current.initializeAD(adContent.list[adContent.selectIndex]);
    } else {
      current.clearCanvas();
    }
  }, [adContent]);
  /* Main */
  return (
    <div className={classNames(Styles.adCanvasContainer)}>
      <div className={classNames(Styles.adCanvasDownloadContainer)}>
        {RenderDownloadButton}
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default memo(ADCanvas);
