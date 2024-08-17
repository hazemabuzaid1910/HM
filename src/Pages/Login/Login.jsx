import './Login.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/fontawesome-free-solid';
import background from '../../assets/Screenshot (48) 1.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './LoginSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };
const goToForgetPassowrd=()=>{
  navigate('/change-passowrd')
}
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home-Page');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
   <img src={background} alt="" />
      <div className="container">
        <div className="image">
          <span className="PingoWay">Pingoway</span>
          <span className="Welcome">Welcome</span>
        </div>
        <div className="login">
          <span className="welcom">Welcome Back...</span>
          <div className="inputs">
            <input
              className="user"
              type="text"
              placeholder="Email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon-user">
            <FontAwesomeIcon  icon={faUser} />

            </span>
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon className="icon-password" icon={faLock} />
            <span onClick={goToForgetPassowrd} className="forget-password">
              Forget your password?
            </span>
          </div>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
