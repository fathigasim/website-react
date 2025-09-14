

import React, { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button,InputGroup } from "react-bootstrap";
import { BsBoxArrowInRight } from "react-icons/bs";

const LOGIN_URL = "https://localhost:7228/api/Login";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
const [showPassword, setShowPassword] = useState(false);
  // Extract redirect param
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect") || "/";

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: { username: "", password: "" },
  });

  // Reset form on successful submit
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        username: data.username,
        password: data.password,
      });

      const token = response?.data?.token;
      if (!token) {
        setError("root", { type: "manual", message: "No token returned from server." });
        return;
      }

      // Log in using AuthContext
      login( token );

      // Redirect safely
      let target = redirect;
      if (target.startsWith("/login")) target = "/";
      navigate(target, { replace: true });
    } catch (err) {
      // Safe error handling
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Login failed. Please try again.";

      console.error("Login failed:", message);
      setError("root", { type: "manual", message });
    }
  };

  return (
    // <Container className="mt-5">
    //   <Row className="justify-content-md-center">
    //     <Col md={4}>
    //       <Card>
    //         <Card.Body>
    //           <h3 className="mb-4">Login</h3>
    //           <Form onSubmit={handleSubmit(onSubmit)}>
    //             <Form.Group className="mb-3" controlId="formUsername">
    //               <Form.Label>Username</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 placeholder="Enter username"
    //                 autoComplete="off"
    //                 {...register("username", { required: "Username is required" })}
    //               />
    //               {errors.username && <span className="text-danger">{errors.username.message}</span>}
    //             </Form.Group>

    //             <Form.Group className="mb-3" controlId="formPassword">
    //               <Form.Label>Password</Form.Label>
    //               <Form.Control
    //                 type="password"
    //                 placeholder="Enter password"
    //                 {...register("password", { required: "Password is required" })}
    //               />
    //               {errors.password && <span className="text-danger">{errors.password.message}</span>}
    //             </Form.Group>

    //             <Button disabled={isSubmitting} variant="dark"  type="submit" className="w-100 mb-2"
    //             style={{ backgroundColor: "#2c3e50 !important" }}
    //             >
    //               <BsBoxArrowInRight size="1.5em" /> {isSubmitting ? "Loading..." : "Login"}
    //             </Button>

    //             {errors.root && <span className="text-danger">{errors.root.message}</span>}
    //             {isSubmitSuccessful && <p className="text-success">Form submitted successfully!</p>}
    //           </Form>

    //           <Link to="/forgotPassword">Forgot Password?</Link>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={5} lg={4}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-4">
              <h3 className="mb-4 text-center fw-bold">Login</h3>

              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Username */}
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    autoComplete="off"
                    {...register("username", { required: "Username is required" })}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...register("password", { required: "Password is required" })}
                      isInvalid={!!errors.password}
                    />
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Login Button */}
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-100 mb-2"
                  style={{ backgroundColor: "#2c3e50", border: "none" }}
                >
                  <BsBoxArrowInRight size="1.2em" className="me-2" />
                  {isSubmitting ? "Loading..." : "Login"}
                </Button>

                {/* Form Messages */}
                {errors.root && <p className="text-danger">{errors.root.message}</p>}
                {isSubmitSuccessful && (
                  <p className="text-success">Form submitted successfully!</p>
                )}
              </Form>

              {/* Forgot Password */}
              <div className="mt-3 text-center">
                <Link to="/forgotPassword" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
