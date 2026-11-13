import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, Lock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useLazyGetProfileQuery } from '@/redux/api/authApi';
import { clearSession } from '@/redux/features/authSlice';

const ALLOWED_ADMIN_ROLES = new Set(['admin', 'super_admin', 'editor']);

// Deduplicate concurrent session checks (e.g., React StrictMode double-mount)
let inFlightVerify: { token: string; promise: Promise<unknown> } | null = null;

export interface ProtectedAdminRouteProps {
  children: ReactNode;
}

/**
 * Blocks unauthenticated visitors and non-staff roles from Admin/Dashboard routes.
 * Re-validates stored JWTs against GET /user/me before unlocking the workspace.
 */
export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [triggerGetProfile] = useLazyGetProfileQuery();
  const { user, token, isAuthenticated, initialized } = useAppSelector((state) => state.auth);
  const needsVerification = Boolean(token) && !(initialized && isAuthenticated && user);
  const [isVerifying, setIsVerifying] = useState<boolean>(needsVerification);

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      return;
    }

    if (initialized && isAuthenticated && user) {
      setIsVerifying(false);
      return;
    }

    let active = true;
    setIsVerifying(true);

    if (!inFlightVerify || inFlightVerify.token !== token) {
      const verifyPromise = triggerGetProfile()
        .unwrap()
        .catch(() => {
          dispatch(clearSession());
        })
        .finally(() => {
          if (inFlightVerify?.promise === verifyPromise) {
            inFlightVerify = null;
          }
        });
      inFlightVerify = { token, promise: verifyPromise };
    }

    inFlightVerify.promise.finally(() => {
      if (active) setIsVerifying(false);
    });

    return () => {
      active = false;
    };
  }, [dispatch, triggerGetProfile, token, initialized, isAuthenticated, user]);

  if (isVerifying) {
    return (
      <div className="min-h-screen w-full bg-[#EFECE6] flex flex-col items-center justify-center gap-3 text-stone-700">
        <div className="w-10 h-10 rounded-full border-[3px] border-stone-300 border-t-[#F97316] animate-spin" />
        <p className="text-xs font-medium uppercase tracking-widest text-stone-500">
          Verifying Session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!ALLOWED_ADMIN_ROLES.has(user.role)) {
    return (
      <div className="min-h-screen w-full bg-[#EFECE6] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-stone-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-stone-900">Admin Access Required</h1>
          <p className="text-sm text-stone-500">
            Your account ({user.email}) does not have administrator or editor permissions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
            >
              Return Home
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-semibold"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In with Admin</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
