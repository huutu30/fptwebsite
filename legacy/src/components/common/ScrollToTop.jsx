import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();
  const { pathname, state } = location;
  const prevPath = useRef(pathname);

  useEffect(() => {
    // Nếu có truyền state preventScrollTop = true thì KHÔNG cuộn lên đầu trang
    if (state?.preventScrollTop) {
      prevPath.current = pathname;
      return;
    }

    // Cuộn lên đầu trang khi chuyển route khác
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    prevPath.current = pathname;
  }, [pathname, state]);

  return null;
}
