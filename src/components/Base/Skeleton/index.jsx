import React, { memo, useMemo } from 'react';
import MDSkeleton from '@material-ui/lab/Skeleton';

function Skeleton(SkeletonProps) {
  const {
    typeSkeletonCount = 1,
    animation = 'wave',
    variant = 'rect',
    width = '100%',
    height = 140,
    className,
  } = SkeletonProps;
  const RenderBorder = useMemo(() => {
    const skeleton = [];
    for (let i = 0; i < typeSkeletonCount; i += 1) {
      skeleton.push(<MDSkeleton key={i} className={className} animation={animation} variant={variant} width={width} height={height} />);
    }
    return skeleton;
  }, [typeSkeletonCount]);
  return (
    <React.Fragment>
      {RenderBorder}
    </React.Fragment>
  );
}

export default memo(Skeleton);
