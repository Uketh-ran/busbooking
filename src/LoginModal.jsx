// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const LoginModal = ({ show, handleClose }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (email === 'user@example.com' && password === 'password123') {
//       sessionStorage.setItem("isLoggedIn", "true"); // Store login status
//       handleClose(); // Close the modal
//       navigate('/'); // Redirect to home page
//     } else {
//       alert('Invalid email or password');
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Login to Your Account</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>

//           <Button variant="danger" onClick={handleLogin}>
//             Login
//           </Button>

//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default LoginModal;

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginModal= ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login/Register
  const navigate = useNavigate();

  // Switch between Login and Register
  const toggleForm = () => setIsLogin(!isLogin);

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("user", JSON.stringify(data.user));
        handleClose(); // Close the modal
        navigate('/'); // Redirect to home
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  // Handle Register
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! Please log in.');
        setIsLogin(true); // Switch to Login form after successful registration
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login to Your Account' : 'Create a New Account'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          )}

          <Button
            variant={isLogin ? 'danger' : 'success'}
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <Button variant="link" onClick={toggleForm}>
            {isLogin ? 'New here? Create an account' : 'Already have an account? Login'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
