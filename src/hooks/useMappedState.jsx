import { useSelector } from 'react-redux';

export default function useMappedState(mapState, equalityFn) {
  return useSelector(mapState, equalityFn);
}
