import { useEffect, useRef, type PropsWithChildren } from 'react';
import { useLazyGetProfileQuery } from '@/redux/api/authApi';
import { logout } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function AuthBootstrap({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const { token, initialized } = useAppSelector((state) => state.auth);
  const [triggerGetProfile] = useLazyGetProfileQuery();
  const lastVerifiedTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (!token) {
      lastVerifiedTokenRef.current = null;
      return;
    }
    if (initialized || lastVerifiedTokenRef.current === token) {
      return;
    }

    lastVerifiedTokenRef.current = token;
    void triggerGetProfile()
      .unwrap()
      .catch(() => {
        dispatch(logout());
      });
  }, [token, initialized, triggerGetProfile, dispatch]);

  return <>{children}</>;
}

