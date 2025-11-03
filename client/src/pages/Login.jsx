




import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import BackEndUrl from '../config/BackEndUrl';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let api = `${BackEndUrl}/user/login`;
      const response = await axios.post(api, { email, password });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      navigate('/'); // Redirect after login
    } catch (err) {
      alert('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px 30px",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "450px"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#ff7e5f",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "20px"
          }}
        >
          User Login
        </h1>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              style={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "10px"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              style={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "10px"
              }}
            />
          </Form.Group>

          <p style={{ marginTop: "10px", color: "#333" }}>
            If you don't have an account{" "}
            <span
              style={{
                cursor: "pointer",
                color: "#ff7e5f",
                fontWeight: "bold"
              }}
              onClick={() => { navigate("/registration") }}
            >
              Sign Up
            </span>{" "}
            now
          </p>

          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
              border: "none",
              padding: "10px",
              fontWeight: "bold",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
          >
            Submit!
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
