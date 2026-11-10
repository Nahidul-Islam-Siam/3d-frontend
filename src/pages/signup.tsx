import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Seo from '@/components/Seo';
import AuthShowcaseShell from '@/components/auth/AuthShowcaseShell';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { register as registerUser } from '@/lib/store/thunks/auth.thunks';
import { addToast } from '@/lib/store/slices/uiSlice';

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Include at least 1 uppercase letter')
      .regex(/[0-9]/, 'Include at least 1 number')
      .regex(/[!@#$%^&*]/, 'Include at least 1 special character (!@#$%^&*)'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type Inputs = z.infer<typeof schema>;

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      setRegisteredSuccess(true);
      dispatch(
        addToast({
          type: 'success',
          message: 'Account created! Redirecting to sign in.',
        })
      );
      setTimeout(() => navigate('/login'), 1200);
    } catch {
      // Displayed cleanly via Redux error state
    }
  };

  return (
    <>
      <Seo
        title="Sign Up | Live Achieve Believe"
        description="Create your Live Achieve Believe community account."
      />

      <AuthShowcaseShell
        title={
          <>
            Join the<br />Movement
          </>
        }
        subtitle="Please login or sign up to continue"
        footerPrompt="Already have an account?"
        footerLinkLabel="Login"
        footerLinkTo="/login"
      >
        {registeredSuccess ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-stone-900">
              Account Created Successfully
            </p>
            <p className="text-xs text-stone-500">
              Redirecting you to sign in...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <div>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  {...register('name')}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F4F3F1] border border-transparent focus:border-[#F97316]/50 focus:bg-white text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[11px] mt-1 pl-1">{errors.name.message}</p>
              )}
            </div>

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

            <div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F4F3F1] border border-transparent focus:border-[#F97316]/50 focus:bg-white text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-[11px] mt-1 pl-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#F97316] hover:bg-[#ea580c] disabled:opacity-60 text-white text-sm font-semibold shadow-[0_8px_20px_rgba(249,115,22,0.28)] transition-all cursor-pointer mt-1"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
        )}
      </AuthShowcaseShell>
    </>
  );
}
