import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../../lib/api'; // لسه هنضيفها
import useHooksMutation from '../../hooks/useMutation';
import { toast } from 'react-hot-toast';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {isPending, error, mutate ,isSuccess} = useHooksMutation(resetPasswordRequest)
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/login');
      }, 2000); 
    }
  }, [isSuccess, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    mutate({ password, token });
  };

  return (
    <div className="streamify-auth-bg">
      <div className="streamify-card w-full max-w-md p-6 sm:p-8">
        <h2 className="streamify-title mb-4">Reset Password</h2>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error.response?.data?.message || "Something went wrong"}</span>
          </div>
        )}

        {isSuccess && (
          <div className="alert alert-success mb-4">
            <span>Password reset successful! Redirecting to login...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered streamify-input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="input input-bordered streamify-input w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full min-h-12 rounded-xl" type="submit" disabled={isPending}>
            {isPending ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
