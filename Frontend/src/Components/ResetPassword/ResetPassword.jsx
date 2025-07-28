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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-base-100 rounded shadow-md border">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

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
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
            {isPending ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
