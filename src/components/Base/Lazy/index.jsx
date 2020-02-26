import React, {
  lazy,
  Suspense,
  useMemo,
  useState,
  useEffect,
} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Skeleton from '@material-ui/lab/Skeleton';
import { delay } from '@Tools/utility';
import Loading from '@Components/Base/Loading';

const Components = {};

function Lazy(lazyProps) {
  const {
    componentImport,
    componentChunkName,
    componentProps,
  } = lazyProps;
  const [isRender, setIsRender] = useState(false);
  const RenderComponent = useMemo(() => {
    const Component = Components[componentChunkName];
    if (Component) {
      return (<Component {...componentProps} />);
    }
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Loading
          typePosition="relative"
          typeZIndex={10005}
          typeIcon="line:fix"
          isLoading
        />
        <Skeleton variant="rect" width="100%" height="100%" animation="wave" />
      </div>
    );
  }, [componentChunkName, isRender]);
  /* Hooks */
  useEffect(() => {
    (async () => {
      if (!Components[componentChunkName]) {
        await delay(800);
        Components[componentChunkName] = lazy(() => componentImport);
      }
      setIsRender(cloneDeep(!isRender));
    })();
  }, [componentChunkName]);
  return (
    <React.Fragment>
      <Suspense fallback={<Loading typePosition="relative" typeZIndex={10005} typeIcon="line:fix" isLoading />}>
        {RenderComponent}
      </Suspense>
    </React.Fragment>
  );
}

export default Lazy;
