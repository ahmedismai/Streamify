import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../../lib/api'; // هننشئها بعدين
import useHooksMutation from '../../hooks/useMutation';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, error, isSuccess } = useHooksMutation(sendPasswordResetEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email });
  };

  return (
    <div className="streamify-auth-bg">
      <div className="streamify-card w-full max-w-md p-6 sm:p-8">
        <h2 className="streamify-title mb-3">Forgot Your Password?</h2>
        <p className="mb-5 text-sm opacity-70">Enter your email to receive a password reset link.</p>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error.response?.data?.message || "An error occurred"}</span>
          </div>
        )}

        {isSuccess && (
          <div className="alert alert-success mb-4">
            <span>Reset link sent! Check your inbox.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            className="input input-bordered streamify-input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full min-h-12 rounded-xl" type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          <Link to="/login" className="text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
