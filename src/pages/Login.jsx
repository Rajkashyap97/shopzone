import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { loginAsGuest, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/checkout';

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <span className="eyebrow">// auth: mock session</span>
        <h1>Log in to continue</h1>
        <p>Checkout is a protected route. Sign in as a guest to proceed.</p>

        {isAuthenticated ? (
          <p className="login-note">You're already signed in.</p>
        ) : (
          <button className="btn btn-primary" onClick={handleGuestLogin}>
            Login as Guest →
          </button>
        )}
      </div>
    </div>
  );
}
