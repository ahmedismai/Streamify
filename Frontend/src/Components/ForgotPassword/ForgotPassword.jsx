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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-base-100 rounded shadow-md border">
        <h2 className="text-xl font-bold mb-4">Forgot Your Password?</h2>
        <p className="mb-4 text-sm opacity-70">Enter your email to receive a password reset link.</p>

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
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
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
