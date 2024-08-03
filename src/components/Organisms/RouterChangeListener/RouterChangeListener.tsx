import { alternarInstanceState } from '@/components/state/altenarInstanceState';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const RouteChangeListener = () => {
  const pathname = usePathname();
  const [altenarInstance, setAltenarInstance] = useRecoilState(alternarInstanceState);

  useEffect(() => {
    const savedPathname = Cookies.get('CURRENT_PATH');
    if (savedPathname !== pathname || !savedPathname) {
      if (altenarInstance) {
        altenarInstance.remove();
        setAltenarInstance(undefined);
      }
      Cookies.set('CURRENT_PATH', pathname, { expires: 1 });
    }
  }, [pathname, altenarInstance, setAltenarInstance]);

  return null;
};

export default RouteChangeListener;
