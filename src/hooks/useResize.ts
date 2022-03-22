import { useEffect, useState } from 'react';

type SizeDocument = {
  width: number;
  height: number;
};

export const useResize = (callback: Function = () => {}): SizeDocument => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      setWidth(+window.innerWidth);
      setHeight(+window.innerHeight);
      callback();
    };
    updateSize();

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width]);

  return {
    width,
    height,
  };
};
