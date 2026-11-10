import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Seo from '@/components/Seo';
import AuthShowcaseShell from '@/components/auth/AuthShowcaseShell';
import authService from '@/lib/api/services/auth.service';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { login } from '@/lib/store/thunks/auth.thunks';
import { addToast } from '@/lib/store/slices/uiSlice';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
});

type Inputs = z.infer<typeof schema>;

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [forgotMsg, setForgotMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const auth = await dispatch(login(data)).unwrap();
      dispatch(
        addToast({
          type: 'success',
          message: 'Successfully signed in!',
        })
      );
      const isStaff =
        auth.user.role === 'admin' ||
        auth.user.role === 'super_admin' ||
        auth.user.role === 'editor';
      const redirectFrom = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      if (isStaff) {
        navigate(redirectFrom || '/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch {
      // Displayed cleanly via Redux error state
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotStatus('sending');
    try {
      await authService.forgotPassword(forgotEmail);
      setForgotStatus('sent');
      setForgotMsg('If that account exists, a password reset link was sent to your inbox.');
    } catch {
      setForgotStatus('error');
      setForgotMsg('Could not send reset email right now. Please try again.');
    }
  };

  return (
    <>
      <Seo
        title="Sign In | Live Achieve Believe"
        description="Sign in to the Live Achieve Believe operations hub and community portal."
      />

      <AuthShowcaseShell
        title={
          forgotMode ? (
            <>
              Reset<br />Your Password
            </>
          ) : (
            <>
              Welcome<br />Back Home
            </>
          )
        }
        subtitle={
          forgotMode
            ? 'Enter your email to receive a reset link'
            : 'Please login or sign up to continue'
        }
        footerPrompt="Don't have an account?"
        footerLinkLabel="Sign Up"
        footerLinkTo="/signup"
      >
        {forgotMode ? (
          <form onSubmit={handleForgotSubmit} className="space-y-3.5">
            {forgotStatus === 'sent' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
                {forgotMsg}
              </div>
            )}
            {forgotStatus === 'error' && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {forgotMsg}
              </div>
            )}

            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F4F3F1] border border-transparent focus:border-[#F97316]/50 focus:bg-white text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={forgotStatus === 'sending'}
              className="w-full h-11 rounded-xl bg-[#F97316] hover:bg-[#ea580c] disabled:opacity-60 text-white text-sm font-semibold shadow-[0_8px_20px_rgba(249,115,22,0.28)] transition-all cursor-pointer"
            >
              {forgotStatus === 'sending' ? 'Sending...' : 'Send Reset Link'}
            </button>

            <button
              type="button"
              onClick={() => {
                setForgotMode(false);
                setForgotStatus('idle');
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 pt-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  {...register('email')}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F4F3F1] border border-transparent focus:border-[#F97316]/50 focus:bg-white text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[11px] mt-1 pl-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your Password"
                  {...register('password')}
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#F4F3F1] border border-transparent focus:border-[#F97316]/50 focus:bg-white text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[11px] mt-1 pl-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setForgotMode(true)}
                className="text-xs text-stone-500 hover:text-[#F97316] transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#F97316] hover:bg-[#ea580c] disabled:opacity-60 text-white text-sm font-semibold shadow-[0_8px_20px_rgba(249,115,22,0.28)] transition-all cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}
      </AuthShowcaseShell>
    </>
  );
}
