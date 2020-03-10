import { useEffect } from 'react';

export default function useDidMount(effect) {
  return useEffect(effect, []);
}
