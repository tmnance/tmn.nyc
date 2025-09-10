import { useEffect } from 'react';

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - tmn.nyc`;
  }, [title]);
};

export default usePageTitle;
